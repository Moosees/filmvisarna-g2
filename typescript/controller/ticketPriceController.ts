import db from '../config/connectDB.js';
import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2';

const getTicketPrice = async (req: Request, res: Response) => {
  try {
    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      'SELECT ticket_name, price FROM ticket t '
    );

    // Check if the movie was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Bokning inte hittad' });
      return;
    }

    // Return the found movie
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

export default { getTicketPrice };
