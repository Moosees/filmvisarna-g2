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

const filerMovies = async (req: Request, res: Response) => {
  try {
    const { age, date, title } = req.query as {
      age?: number;
      date?: string;
      title?: string;
    };

    if (!age && !date && !title) {
      res
        .status(400)
        .json({ message: 'Parameter för ålder eller datum krävs' });
      return;
    }

    let query = `SELECT * FROM screening s
      INNER JOIN movie m ON s.movie_id = m.id
      WHERE 1=1`;

    const params: (string | number)[] = [];

    if (age) {
      query += ` AND m.age = ?`;
      params.push(age);
    }

    if (date) {
      query += ` AND DATE_FORMAT(s.start_time, '%Y-%m-%d')= ?`;
      params.push(date);
    }
    if (title) {
      query += ` AND m.title = ?`;
      params.push(title);
    }

    //Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      query,
      params
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

export default { getSpecificMovie, filerMovies };
