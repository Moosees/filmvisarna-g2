import db from '../config/connectDB.js';
import { Request, Response } from 'express';

const getSpecificMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const query: string = 'SELECT * FROM  movie m WHERE m.id =?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ msg: 'Något gick fel', error });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ msg: 'något gick fel', error });
  }
};

export default { getSpecificMovie };
