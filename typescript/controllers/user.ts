import express, { Request, Response } from 'express';
import db from '../config/connectDB';
import { ResultSetHeader } from 'mysql2/promise';

const app = express();
app.use(express.json());

interface RegisterRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const registerHandler: express.RequestHandler = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({ error: 'Alla fält måste vara ifyllda' });
    return;
  }

  const query = `
    INSERT INTO users (email, password, firstName, lastName)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await db.execute<ResultSetHeader>(query, [
      email,
      password,
      firstName,
      lastName,
    ]);

    res.status(201).json({
      message: 'Användare registrerad',
      userId: result.insertId,
    });
    return;
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Serverfel vid registrering' });
    return;
  }
};

app.post('/user/register', registerHandler);
