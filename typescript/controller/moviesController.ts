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
      ` SELECT * FROM view_movie_details WHERE movieId = ?`,
      [id]
    );

    // Check if the movie was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Film hittades inte' });
      return;
    }

    const { movieInfo, ...other } = results[0];
    const responseData = {
      ...other,
      ...movieInfo,
    };

    // Return the found movie
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const getTodaysMovie = async (req: Request, res: Response) => {
  try {
    await db.execute('SET lc_time_names = "sv_SE"');
    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      `SELECT
      m.id as movieId,
      m.title,
      m.poster_url as posterUrl,
      m.age,
      s.start_time as fullDate,
      s.id AS screeningId,
      concat(date_format(s.start_time, '%H:%i'), '-', date_format((s.start_time + interval m.play_time minute), '%H:%i')) AS startTime,
      JSON_OBJECT(
            'dayName', CASE
                    WHEN DATE(s.start_time) = CURDATE() THEN 'idag'
                    ELSE DAYNAME(s.start_time)
                    END,
            'screeningDate', DATE_FORMAT(s.start_time, '%d-%b')
        ) as dateFormat
      FROM screening s
      INNER JOIN movie m ON s.movie_id = m.id
      WHERE DATE_FORMAT(s.start_time, '%Y-%m-%d') = CURRENT_DATE()
       ORDER BY s.start_time ASC;
      `
    );

    // Check if the movie was found
    // if (results.length === 0) {
    // res.status(404).json({ message: 'Film hittades inte' });
    //   return;
    // }

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
    const { age, startDate, endDate, title } = req.query as {
      age?: number;
      startDate?: string;
      endDate?: string;
      title?: string;
    };
    await db.execute('SET lc_time_names = "sv_SE"');

    let query = `
    SELECT
    m.id AS movieId,
    m.title,
    m.poster_url AS posterUrl,
    m.age as age,
    s.id as screeningId,
    DATE_FORMAT(s.start_time, '%Y-%m-%d') AS startDate,
    CONCAT(
        DATE_FORMAT(s.start_time, '%H:%i'),
        '-',
        DATE_FORMAT(s.start_time + INTERVAL m.play_time MINUTE, '%H:%i')
    ) AS timeRange,
    JSON_OBJECT(
            'dayName', CASE
                    WHEN DATE(s.start_time) = CURDATE() THEN 'idag'
                    ELSE DAYNAME(s.start_time)
                    END,
            'screeningDate', DATE_FORMAT(s.start_time, '%d-%b')
        ) as dateFormat
FROM
    screening s
INNER JOIN
    movie m ON s.movie_id = m.id
    WHERE
      s.start_time > DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 15 MINUTE)
    `;
    const params: (string | number)[] = [];

    if (age) {
      query += ` AND m.age <= ?`;
      params.push(age);
    }

    if (startDate && endDate) {
      query += ` AND DATE_FORMAT(s.start_time, '%Y-%m-%d') BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    } else if (startDate) {
      query += ` AND DATE_FORMAT(s.start_time, '%Y-%m-%d') >= ?`;
      params.push(startDate);
    } else if (endDate) {
      query += ` AND DATE_FORMAT(s.start_time, '%Y-%m-%d') <= ?`;
      params.push(endDate);
    }

    if (title) {
      query += ` AND m.title LIKE ?`;
      params.push(`%${title}%`);
    }

    query += ` ORDER BY s.start_time ASC; `;

    //Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      query,
      params
    );

    //Check if the movie was found
    if (results.length === 0) {
      res.status(200).json([]);
      return;
    }

    //Return the found movie
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: 'Något gick fel',
      error,
    });
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
