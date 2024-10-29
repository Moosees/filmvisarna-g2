import db from '../config/connectDB.js';
import { Request, Response } from 'express';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

const addMovie = async (req: Request, res: Response): Promise<void> => {
  const { title, play_time, url_param, age, movie_info, poster_url } = req.body;

  // Validate input fields
  if (
    !title ||
    !play_time ||
    !url_param ||
    !age ||
    !movie_info ||
    !poster_url
  ) {
    res.status(400).json({ message: 'Alla fält är obligatoriska' });
    return;
  }

  if (typeof play_time !== 'number' || play_time <= 0) {
    res.status(400).json({ message: 'Speltiden måste vara ett positivt tal' });
    return;
  }

  try {
    const [results]: [ResultSetHeader, FieldPacket[]] = await db.execute(
      'INSERT INTO movie (title, play_time, url_param, age, movie_info,poster_url) VALUES (?, ?, ?, ?, ?,?)',
      [title, play_time, url_param, age, JSON.stringify(movie_info), poster_url]
    );

    // Send a success response with details of the newly added movie
    res.status(201).json({
      id: results.insertId,
      title,
      play_time,
      url_param,
      age,
      movie_info,
      poster_url,
    });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const getAllMovies = async (req: Request, res: Response) => {
  const query = `SELECT * FROM movie`;
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

const getMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.execute('SET lc_time_names = "sv_SE"');

    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      ` SELECT * FROM vy_filmdetaljer vf WHERE vf.movieId = ?`,
      [id]
    );

    // Check if the movie was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Film hittades inte' });
      return;
    }

    // Return the found movie
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const getTodaysMovie = async (req: Request, res: Response) => {
  try {
    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      `SELECT
      m.id as movieId,
      m.title,
      m.poster_url as posterUrl,
      m.age,
      DATE_FORMAT(s.start_time, '%Y-%m-%d') AS startDate,
      concat(date_format(s.start_time, '%H:%i'), ' - ', date_format((s.start_time + interval m.play_time minute), '%H:%i')) AS timeRange FROM screening s
      INNER JOIN movie m ON s.movie_id = m.id
      WHERE DATE_FORMAT(s.start_time, '%Y-%m-%d') = CURRENT_DATE()`
    );

    // Check if the movie was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Film hittades inte' });
      return;
    }

    // Return the found movie
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const updateMovie = async (req: Request, res: Response) => {
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
      res.status(400).json({ message: 'Inga fält att uppdatera' });
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
      res.status(404).json({ message: 'Film hittades inte' });
      return;
    }

    // Fetch the updated movie and return it
    const [updatedMovie]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      'SELECT * FROM movie WHERE id = ?',
      [id]
    );

    res.status(200).json(updatedMovie[0]);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Execute the SQL query
    const [results]: [ResultSetHeader, FieldPacket[]] = await db.execute(
      'DELETE FROM movie WHERE id = ?',
      [id]
    );

    // Check if any rows were affected
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Film hittades inte' });
      return;
    }

    res.status(200).json({ message: 'Filmen har tagits bort framgångsrikt' }); // Confirmation message
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const filterMovies = async (req: Request, res: Response) => {
  try {
    const { age, date, title } = req.query as {
      age?: number;
      date?: string;
      title?: string;
    };

    // if (!age && !date && !title) {
    //   res
    //     .status(400)
    //     .json({ message: 'Parameter för ålder eller datum krävs' });
    //   return;
    // }

    await db.execute('SET lc_time_names = "sv_SE"');

    //     let query = `
    //   SELECT
    //     m.id as movieId,
    //     m.title,
    //     m.poster_url as posterUrl,
    //     m.age,
    //     DATE_FORMAT(s.start_time, '%Y-%m-%d') AS startDate,
    //     concat(date_format(s.start_time, '%H:%i'), ' - ', date_format((s.start_time + interval m.play_time minute), '%H:%i')) AS timeRange
    //     FROM
    //     screening s
    //     INNER JOIN
    //     movie m ON s.movie_id = m.id
    //     WHERE 1=1
    // `;
    let query = `
    select
    m.id AS movieid,
    m.title AS title,
    m.url_param AS paramUrl,
    m.age AS age,
    m.poster_url AS posterUrl,
    json_arrayagg(json_object('screeningId', s.id,'startDate',DATE_FORMAT(s.start_time, '%Y-%m-%d'),'timeRange',concat(
        date_format(s.start_time, '%H:%i'),
        '-',
        date_format((s.start_time + interval m.play_time minute), '%H:%i')
    ), 'dayName',(case when (cast(s.start_time as date) = curdate()) then 'idag' else dayname(s.start_time) end), 'screeningDate', date_format(s.start_time, '%d %b'))) AS screeningDetails
  from
    screening s
    join bondkatt.movie m on
    s.movie_id =m.id
    WHERE
    CAST(s.start_time AS DATE) >= NOW()
     AND CAST(s.start_time AS DATE) <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
`;

    const params: (string | number)[] = [];

    if (age) {
      query += ` AND m.age <= ?`;
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

    query += ` GROUP BY m.id`;
    // query += ` GROUP BY m.id, m.title, m.poster_url, m.age, s.start_time, timeRange`;

    //Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      query,
      params
    );

    //Check if the movie was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Film hittades inte' });
      return;
    }

    //Return the found movie
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

export default {
  getAllMovies,
  getMovie,
  getTodaysMovie,
  filterMovies,
  updateMovie,
  deleteMovie,
  addMovie,
};
