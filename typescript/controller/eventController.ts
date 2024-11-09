import { FieldPacket, RowDataPacket } from 'mysql2';
import { Request, Response } from 'express';
import db from '../config/connectDB';

const getAllHalloweenMovies = async (req: Request, res: Response) => {
  const query = `SELECT * FROM event WHERE id = 2`;
  try {
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(query);
    if (results.length === 0) {
      res.status(404).json({ message: 'Film hittades inte' });
      return;
    }
    res.status(200).json(results);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

export default { getAllHalloweenMovies };
