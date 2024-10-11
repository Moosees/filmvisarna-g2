import { Request, Response } from 'express';
import db from '../config/connectDB.js';
import { ResultSetHeader } from 'mysql2/promise';

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
}

export default UserController;
