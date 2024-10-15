import db from '../config/connectDB.js';
import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2';

const getSpecificMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      'SELECT * FROM movie m WHERE m.id = ?',
      [id]
    );

    // Check if the movie was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Film inte hittad' });
      return;
    }

    // Return the found movie
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

export default { getSpecificMovie };
