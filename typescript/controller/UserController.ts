import { Request, Response } from 'express';
import db from '../config/connectDB';
import { ResultSetHeader, FieldPacket } from 'mysql2/promise';

interface RegisterRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

class UserController {
  public static async register(
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
  ): Promise<void> {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ error: 'Alla fält måste vara ifyllda' });
      return;
    }

    const query = `
      INSERT INTO users (email, password, firstName, lastName)
      VALUES (?, ?, ?, ?)
    `;

    try {
      // Använd 'unknown' för att hantera typkonverteringen säkert
      const [result] = (await db.execute(query, [
        email,
        password,
        firstName,
        lastName,
      ])) as unknown as [ResultSetHeader, FieldPacket[]];

      res.status(201).json({
        message: 'Användare registrerad',
        userId: result.insertId,
      });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Serverfel vid registrering' });
    }
  }
}

export default UserController;
