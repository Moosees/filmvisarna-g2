import db from '../config/connectDB.js';
import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2';

const getAgeFilter = async (req: Request, res: Response) => {
  try {
    const { age } = req.query;

    // Kontrollera om 'age' är med
    if (!age) {
      res.status(400).json({ message: 'Age parameter is required' });
      return;
    }

    //Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      `SELECT * FROM screening s
       INNER JOIN movie m ON s.movie_id = m.id
       WHERE m.age = ?`,
      [age]
    );

    //Check if the movie was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Film inte hittad' });
      return;
    }

    //Return the found movie
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const getDateFilter = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;

    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      `SELECT *
      FROM screening s
      INNER JOIN movie m ON s.movie_id = m.id
      WHERE DATE_FORMAT(s.start_time, '%Y-%m-%d') = ?`,
      [date]
    );

    // Check if the movie was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Film inte hittad' });
      return;
    }

    // Return the found movie
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

export default { getAgeFilter, getDateFilter };
