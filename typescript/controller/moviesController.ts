import db from '../config/connectDB.js';
import { Request, Response } from 'express';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

// interface Movie {
//   id: number;
//   title: string;
//   play_time: number;
//   movie_info: string;
// }

const getAllMovies = async (req: Request, res: Response) => {
  const query = `SELECT * FROM movie`;
  try {
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(query);
    if (results.length === 0) {
      res.status(404).json({ message: 'Film inte hittad' });
      return;
    }
    res.status(200).json(results);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

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

const updateSpecificMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, play_time, movie_info } = req.body;

    // Collect the fields that need to be updated
    const fieldsToUpdate: string[] = [];
    const valuesToUpdate: string[] = [];

    if (title) {
      fieldsToUpdate.push('title = ?');
      valuesToUpdate.push(title);
    }

    if (play_time) {
      fieldsToUpdate.push('play_time = ?');
      valuesToUpdate.push(play_time);
    }

    if (movie_info) {
      fieldsToUpdate.push('movie_info = ?');
      valuesToUpdate.push(JSON.stringify(movie_info));
    }

    // If no fields are provided for update
    if (fieldsToUpdate.length === 0) {
      res.status(400).json({ message: 'No fields to update' });
      return;
    }

    // Build dynamic SQL query
    const sqlQuery = `UPDATE movie SET ${fieldsToUpdate.join(
      ', '
    )} WHERE id = ?`;
    valuesToUpdate.push(id); // Add the id at the end of the query values

    // Execute the query
    const [result]: [ResultSetHeader, FieldPacket[]] = await db.execute(
      sqlQuery,
      valuesToUpdate
    );

    // Check if any rows were affected (i.e., if the movie with the given ID was found)
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    // Fetch the updated movie and return it
    const [updatedMovie]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      'SELECT * FROM movie WHERE id = ?',
      [id]
    );

    res.status(200).json(updatedMovie[0]);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
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
      query += ` AND m.url_param = ?`;
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

export default {
  getSpecificMovie,
  filerMovies,
  getAllMovies,
  updateSpecificMovie,
};

// const addMovie = async (req: Request, res: Response): Promise<void> => {
//   const { title, play_time, movie_info } = req.body;
//   try {
//     db.query<OkPacket>(
//       'INSERT INTO movie (title, play_time, movie_info) VALUES (?, ?, ?)',
//       [title, play_time, JSON.stringify(movie_info)],
//       (err: Error | null, results: OkPacket): void => {
//         if (err) {
//           res
//             .status(500)
//             .json({ message: 'Database Query Error', error: err.message });
//           return;
//         }
//         res.status(201).json({ id: results.insertId });
//       }
//     );
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error', error });
//   }
// };

// const deleteMovie = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   try {
//     db.query<OkPacket>(
//       'DELETE FROM movie WHERE id = ?',
//       [id],
//       (err: Error | null): void => {
//         if (err) {
//           res
//             .status(500)
//             .json({ message: 'Database Query Error', error: err.message });
//           return;
//         }
//         res.sendStatus(204);
//       }
//     );
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error', error });
//   }
// };
