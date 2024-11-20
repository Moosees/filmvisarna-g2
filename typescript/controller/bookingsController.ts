import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import db from '../config/connectDB.js';

const getBookingHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.session.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Du är inte inloggad' });
    return;
  }

  const query = `
    SELECT * FROM vy_bokningsHistorik vbh WHERE vbh.userId = ? AND DATE_FORMAT(vbh.startTime, '%Y-%m-%d') < CURRENT_DATE
  `;

  try {
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      query,
      [userId]
    );

    res.status(200).json(results.length ? results : []);
  } catch (error) {
    console.error('Fel vid hämtning av bokningshistorik:', error);
    res
      .status(500)
      .json({ message: 'Serverfel vid hämtning av bokningshistorik', error });
  }
};

const getCurrentBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.session.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Du är inte inloggad' });
    return;
  }

  const query = `
    SELECT * FROM vy_bokningsHistorik vbh WHERE vbh.userId = ? AND DATE_FORMAT(vbh.startTime, '%Y-%m-%d') >= CURRENT_DATE
  `;

  try {
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      query,
      [userId]
    );

    res.status(200).json(results.length ? results : []);
  } catch (error) {
    console.error('Fel vid hämtning av bokningar:', error);
    res
      .status(500)
      .json({ message: 'Serverfel vid hämtning av bokningar', error });
  }
};

export default {
  getBookingHistory,
  getCurrentBookings,
};
