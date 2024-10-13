import { Request, Response } from 'express';
import db from '../config/connectDB.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { PasswordEncryptor } from '../helpers/PasswordEncryptor.js';

interface RegisterRequestBody {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
    res.status(400).json({ error: 'Alla fält måste vara ifyllda' });
    return;
  }

  const hashedPassword = await PasswordEncryptor.encrypt(
    { password }['password']
  );

  const query = `
      INSERT INTO user (email, password, first_name, last_name)
      VALUES (?, ?, ?, ?)
    `;

  try {
    const [result] = (await db.execute(query, [
      email,
      hashedPassword,
      first_name,
      last_name,
    ])) as unknown as [ResultSetHeader, any];

    res.status(201).json({
      message: 'Användare registrerad',
      memberId: result.insertId,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes('Duplicate entry')) {
        res.status(409).json({ error: 'E-postadressen är redan registrerad' });
      } else {
        console.error('Error executing query:', err.message);
        res.status(500).json({ error: 'Serverfel vid registrering' });
      }
    } else {
      console.error('An unknown error occurred');
      res.status(500).json({ error: 'Ett okänt fel inträffade' });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Både e-post och lösenord krävs' });
    return;
  }

  const query = `
        SELECT * FROM user WHERE email = ? AND password = ?
        `;

  try {
    const [rows] = (await db.execute(query, [
      email,
      password,
    ])) as RowDataPacket[];

    const user = rows[0];

    if (!user) {
      res.status(401).json({ error: 'Ogiltiga inloggningsuppgifter' });
      return;
    }

    const passwordMatch = await PasswordEncryptor.check(
      password,
      user.password
    );
    if (!passwordMatch) {
      res.status(401).json({ error: 'Ogiltiga inloggningsuppgifter' });
      return;
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    res
      .status(200)
      .json({ message: 'Inloggning lyckades', user: req.session.user });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Serverfel vid inloggning' });
    } else {
      console.error('An unknown error occurred');
      res.status(500).json({ error: 'Ett okänt fel inträffade' });
    }
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: 'Utloggning misslyckades' });
      } else {
        res.status(200).json({ message: 'Utloggning lyckades' });
      }
    });
  } else {
    res.status(400).json({ error: 'Ingen användare är inloggad' });
  }
};

export const UserController = {
  register,
  login,
  logout,
};
