import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import db from '../config/connectDB.js';

const ping = async (req: Request, res: Response) => {
  const user = req.session.user;
  const isLoggedIn = user && ['admin', 'member'].includes(user.role);

  res.status(200).json({ isLoggedIn });
};

// NOTE: delete maybe
const getAllUsers = async (_req: Request, res: Response) => {
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

export default {
  ping,
  getAllUsers,
};
