import { Request, Response } from 'express';
import db from '../config/connectDB.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface RegisterRequestBody {
  member_email: string;
  member_password: string;
  first_name: string;
  last_name: string;
}

class UserController {
  public static async register(
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
  ): Promise<void> {
    const { member_email, member_password, first_name, last_name } = req.body;

    if (!member_email || !member_password || !first_name || !last_name) {
      res.status(400).json({ error: 'Alla fält måste vara ifyllda' });
      return;
    }

    const query = `
      INSERT INTO member (member_email, member_password, first_name, last_name)
      VALUES (?, ?, ?, ?)
    `;

    try {
      // Typkonvertering med unknown först för att hantera TypeScript-varningen
      const [result] = (await db.query(query, [
        member_email,
        member_password,
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
    const { member_email, member_password } = req.body;

    if (!member_email || !member_password) {
      res.status(400).json({ error: 'Både e-post och lösenord krävs' });
      return;
    }

    const query = `
        SELECT * FROM member WHERE member_email = ? AND member_password = ?
        `;

    try {
      const [rows] = (await db.query(query, [
        member_email,
        member_password,
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
