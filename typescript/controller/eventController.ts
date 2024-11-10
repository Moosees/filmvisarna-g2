import { FieldPacket, RowDataPacket } from 'mysql2';
import { Request, Response } from 'express';
import db from '../config/connectDB.js';

const getAllScaryMovies = async (req: Request, res: Response) => {
  const query = `
  SELECT *
  FROM movies
  WHERE movie_id IN (15, 17, 18, 19)
`;

  try {
    // Första frågan för att hämta movie_id för event_id = 2
    const [eventMovies]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      `SELECT movie_id FROM event_movie WHERE event_id = 2`
    );

    if (eventMovies.length === 0) {
      return res
        .status(404)
        .json({ message: 'Inga filmer hittades för detta event' });
    }

    // Extrahera movie_id till en lista
    const movieIds = eventMovies.map((row) => row.movie_id);

    // Andra frågan för att hämta filmdata från movies baserat på movieIds
    const [movies]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      `SELECT * FROM movies WHERE movie_id IN (${movieIds.join(',')})`
    );

    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching scary movies:', error);
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

export default { getAllScaryMovies };
