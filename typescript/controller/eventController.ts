import { FieldPacket, RowDataPacket } from 'mysql2';
import { Request, Response } from 'express';
import db from '../config/connectDB.js';

const getAllScaryMovies = async (req: Request, res: Response) => {
  const query = `
    SELECT 
      e.id AS eventId,
      e.title,
      e.description,
      m.id AS movieId,
      m.poster_url AS posterUrl
    FROM movie m
    INNER JOIN event_movie em ON em.movie_id = m.id
    INNER JOIN event e ON e.id = em.event_id
    WHERE e.id = 2;  
  `;

  try {
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching scary movies:', error);
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const getAllAstridLindgrenMovies = async (req: Request, res: Response) => {
  const query = `
    SELECT 
      e.id AS eventId,
      e.title,
      e.description,
      m.id AS movieId,
      m.poster_url AS posterUrl
    FROM movie m
    INNER JOIN event_movie em ON em.movie_id = m.id
    INNER JOIN event e ON e.id = em.event_id
    WHERE e.id = 1;  
  `;

  try {
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching scary movies:', error);
    res.status(500).json({ message: 'Något gick fel', error });
  }
};
export default { getAllScaryMovies, getAllAstridLindgrenMovies };
