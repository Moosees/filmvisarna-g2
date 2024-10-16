import { Request, Response } from 'express';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import db from '../config/connectDB.js';
import { PasswordEncryptor } from '../helpers/passwordEncrypter.js';

interface RegisterRequest extends Request {
  body: {
    user_email: string;
    user_password: string;
    first_name: string;
    last_name: string;
  };
}

const register = async (req: RegisterRequest, res: Response): Promise<void> => {
  const { user_email, user_password, first_name, last_name } = req.body;

  if (!user_email || !user_password || !first_name || !last_name) {
    res.status(400).json({ message: 'Alla fält måste vara ifyllda' });
    return;
  }

  const hashedPassword = await PasswordEncryptor.encrypt(
    { user_password }['user_password']
  );

  const query = `
    INSERT INTO user (user_email, user_password, first_name, last_name, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const [result] = (await db.execute(query, [
      user_email,
      hashedPassword,
      first_name,
      last_name,
      'member',
    ])) as unknown as [ResultSetHeader];

    res.status(201).json({
      message: 'Användare registrerad med rollen "member"',
      memberId: result.insertId,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('Duplicate entry')) {
        res
          .status(409)
          .json({ message: 'E-postadressen är redan registrerad' });
      } else {
        console.error('Fel vid registrering:', error.message);
        res
          .status(500)
          .json({
            message: 'Serverfel vid registrering',
            error: error.message,
          });
      }
    } else {
      console.error('Ett okänt fel inträffade vid registrering');
      res.status(500).json({ message: 'Ett okänt fel inträffade' });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    res.status(400).json({ message: 'Både e-post och lösenord krävs' });
    return;
  }

  const query = `
        SELECT * FROM user WHERE user_email = ?
        `;

  try {
    const [rows] = (await db.execute(query, [user_email])) as RowDataPacket[];

    const user = rows[0];

    if (!user) {
      res.status(401).json({ message: 'Användaren hittades inte' });
      return;
    }

    const passwordMatch = await PasswordEncryptor.check(
      user_password,
      user.user_password
    );
    if (!passwordMatch) {
      res
        .status(401)
        .json({ message: 'Något gick fel med e-post eller lösenord' });
      return;
    }

    req.session.user = {
      id: user.id,
      email: user_email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };

    res
      .status(200)
      .json({ message: 'Inloggning lyckades', user: req.session.user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Fel vid inloggning:', error.message);
      res
        .status(500)
        .json({ message: 'Serverfel vid inloggning', error: error.message });
    } else {
      console.error('Ett okänt fel inträffade vid inloggning');
      res.status(500).json({ message: 'Ett okänt fel inträffade' });
    }
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Utloggning misslyckades' });
      } else {
        res.status(200).json({ message: 'Utloggning lyckades' });
      }
    });
  } else {
    res.status(400).json({ message: 'Ingen användare är inloggad' });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      'SELECT * FROM member'
    );

    // Check if the user was found
    if (results.length === 0) {
      res.status(404).json({ message: 'user inte hittad' });
      return;
    }

    // Return the found users
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const updateUserDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.session.user?.id;
  const { first_name, last_name, new_password } = req.body;

  if (!userId) {
    res.status(401).json({ message: 'Du är inte inloggad' });
    return;
  }

  try {
    const hashedPassword = new_password
      ? await PasswordEncryptor.encrypt({ new_password }['new_password'])
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
    SELECT * FROM vy_bokningsHistorik vbh WHERE vbh.user_id = ? AND DATE_FORMAT(vbh.start_time, '%Y-%m-%d') <= CURRENT_DATE
  `;

  try {
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      query,
      [userId]
    );

    if (results.length === 0) {
      res.status(404).json({ message: 'Ingen bokningshistorik hittades' });
      return;
    }

    res.status(200).json(results);
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
    SELECT * FROM vy_bokningsHistorik vbh WHERE vbh.user_id = ? AND DATE_FORMAT(vbh.start_time, '%Y-%m-%d') >= CURRENT_DATE
  `;

  try {
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      query,
      [userId]
    );

    if (results.length === 0) {
      res.status(404).json({ message: 'Ingen bokning hittades' });
      return;
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Fel vid hämtning av bokningar:', error);
    res
      .status(500)
      .json({ message: 'Serverfel vid hämtning av bokningar', error });
  }
};

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

const getProfilePage = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.user?.id;


  if (!userId) {
    res.status(401).json({ message: 'Du är inte inloggad' });
    return;
  }

  try {
    const memberQuery = `SELECT user_email, first_name, last_name FROM user WHERE id = ?`;
    const [memberResults]: [RowDataPacket[], FieldPacket[]] = await db.execute(memberQuery, [userId]);
    if (memberResults.length === 0) {
      res.status(404).json({ message: 'Ingen medlem hittades' });
      return;
    }
    const currentBookingsQuery = `
      SELECT * FROM vy_bokningsHistorik vbh WHERE vbh.user_id = ? AND DATE_FORMAT(vbh.start_time, '%Y-%m-%d') >= CURRENT_DATE
    `;
    const [currentBookingsResults]: [RowDataPacket[], FieldPacket[]] = await db.execute(currentBookingsQuery, [userId]);

    // Retrieve booking history
    const bookingHistoryQuery = `
      SELECT * FROM vy_bokningsHistorik vbh WHERE vbh.user_id = ? AND DATE_FORMAT(vbh.start_time, '%Y-%m-%d') <= CURRENT_DATE
    `;
    const [bookingHistoryResults]: [RowDataPacket[], FieldPacket[]] = await db.execute(bookingHistoryQuery, [userId]);

    // Combine all results into one response object
    res.status(200).json({
      memberInfo: memberResults[0],
      currentBookings: currentBookingsResults,
      bookingHistory: bookingHistoryResults,
    });
  } catch (error) {
    console.error('Fel vid hämtning av profilinformation:', error);
    res.status(500).json({ message: 'Serverfel vid hämtning av profilinformation' });
  }
};




export default {
  register,
  login,
  logout,
  getAllUsers,
  updateUserDetails,
  getBookingHistory,
  getCurrentBookings,
  getMemberInfo,
  getProfilePage
};
