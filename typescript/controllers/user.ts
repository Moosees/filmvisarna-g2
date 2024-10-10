import db from '../config/connectDB.js';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.post('/user/register', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  // Kontrollera om alla obligatoriska fält är ifyllda
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Alla fält måste vara ifyllda' });
  }

  // SQL-fråga för att lägga till en ny användare
  const query = `
    INSERT INTO users (email, password, firstName, lastName)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await db.execute(query, [
      email,
      password,
      firstName,
      lastName,
    ]);

    res.status(201).json({
      message: 'Användare registrerad',
      userId: (result as any).insertId,
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Serverfel vid registrering' });
  }
});
