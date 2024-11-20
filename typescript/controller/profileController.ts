import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { PasswordEncryptor } from '../helpers/passwordEncrypter.js';
import db from '../config/connectDB.js';

const getMemberInfo = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Du är inte inloggad' });
    return;
  }

  const query = `SELECT user_email, first_name, last_name FROM user WHERE id = ?`;

  try {
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      query,
      [userId]
    );
    if (results.length === 0) {
      res.status(404).json({ message: 'Ingen medlem hittades' });
      return;
    }
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Fel vid hämtning av medlemsinformation:', error);
    res
      .status(500)
      .json({ message: 'Serverfel vid hämtning av medlemsinformation' });
  }
};

const updateUserDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.session.user?.id;
  const { first_name, last_name, current_password, new_password } = req.body;

  if (!userId) {
    res.status(401).json({ message: 'Du är inte inloggad' });
    return;
  }

  try {
    const [rows] = (await db.execute(
      'SELECT user_password FROM user WHERE id = ?',
      [userId]
    )) as unknown as [RowDataPacket[]];
    const user = rows[0];

    if (!user) {
      res.status(404).json({ message: 'Användaren hittades inte' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      current_password,
      user.user_password
    );

    if (!isPasswordValid) {
      res
        .status(400)
        .json({ message: 'Det nuvarande lösenordet är felaktigt' });
      return;
    }

    const hashedPassword = new_password
      ? await PasswordEncryptor.encrypt(new_password)
      : null;

    await db.execute(
      `UPDATE user SET
        first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        user_password = COALESCE(?, user_password)
        WHERE id = ?`,
      [first_name || null, last_name || null, hashedPassword || null, userId]
    );

    res.status(200).json({ message: 'Användarinformation uppdaterad' });
  } catch (error) {
    console.error('Fel vid uppdatering av användarinformation:', error);
    res
      .status(500)
      .json({ error: 'Serverfel vid uppdatering av användarinformation' });
  }
};

const getProfilePage = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Du är inte inloggad' });
    return;
  }

  try {
    const memberQuery = `SELECT user_email, first_name, last_name FROM user WHERE id = ?`;
    const [memberResults]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      memberQuery,
      [userId]
    );
    if (memberResults.length === 0) {
      res.status(404).json({ message: 'Ingen medlem hittades' });
      return;
    }
    const currentBookingsQuery = `
      SELECT * FROM vy_bokningsHistorik vbh WHERE vbh.userId = ? AND DATE_FORMAT(vbh.startTime, '%Y-%m-%d') >= CURRENT_DATE
    `;
    const [currentBookingsResults]: [RowDataPacket[], FieldPacket[]] =
      await db.execute(currentBookingsQuery, [userId]);

    const bookingHistoryQuery = `
      SELECT * FROM vy_bokningsHistorik vbh WHERE vbh.userId = ? AND DATE_FORMAT(vbh.startTime, '%Y-%m-%d') <= CURRENT_DATE
    `;
    const [bookingHistoryResults]: [RowDataPacket[], FieldPacket[]] =
      await db.execute(bookingHistoryQuery, [userId]);

    res.status(200).json({
      memberInfo: memberResults[0],
      currentBookings: currentBookingsResults.length
        ? currentBookingsResults
        : [],
      bookingHistory: bookingHistoryResults.length ? bookingHistoryResults : [],
    });
  } catch (error) {
    console.error('Fel vid hämtning av profilinformation:', error);
    res
      .status(500)
      .json({ message: 'Serverfel vid hämtning av profilinformation' });
  }
};

export default {
  updateUserDetails,
  getMemberInfo,
  getProfilePage,
};
