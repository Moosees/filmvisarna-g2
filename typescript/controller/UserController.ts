import { Request, Response } from 'express';
import db from '../config/connectDB.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface RegisterRequestBody {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

class UserController {
  public static async register(
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
  ): Promise<void> {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
      res.status(400).json({ error: 'Alla fält måste vara ifyllda' });
      return;
    }

    const query = `
      INSERT INTO user (email, password, first_name, last_name)
      VALUES (?, ?, ?, ?)
    `;

    try {
      const [result] = (await db.execute(query, [
        email,
        password,
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
          res
            .status(409)
            .json({ error: 'E-postadressen är redan registrerad' });
        } else {
          console.error('Error executing query:', err.message);
          res.status(500).json({ error: 'Serverfel vid registrering' });
        }
      } else {
        console.error('An unknown error occurred');
        res.status(500).json({ error: 'Ett okänt fel inträffade' });
      }
    }
  }
  public static async login(req: Request, res: Response): Promise<void> {
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

      if (rows.length === 0) {
        res.status(401).json({ error: 'Ogiltiga inloggningsuppgifter' });
      } else {
        res.status(200).json({ message: 'Inloggning lyckades', user: rows[0] });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error executing query:', err.message);
        res.status(500).json({ error: 'Serverfel vid inloggning' });
      } else {
        console.error('An unknown error occurred');
        res.status(500).json({ error: 'Ett okänt fel inträffade' });
      }
    }
  }
}

export default UserController;
