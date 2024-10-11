import db from '../config/connectDB.js';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

const getSpecificMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const query: string = 'SELECT * FROM  movie m WHERE m.id =?';

    db.execute(query, [id], (error, results: RowDataPacket[]) => {
      if (error) {
        return res.status(500).json({ msg: 'Något gick fel', error });
      }

      if (results.length === 0) {
        return res.status(404).json({ msg: 'Film inte hittad' });
      }

      if (results) res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ msg: 'Något gick fel', error });
  }
};

export default { getSpecificMovie };
