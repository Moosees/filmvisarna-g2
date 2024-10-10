import './config/dotenv.js';

import express from 'express';
import db from './config/connectDB.js';
import { RowDataPacket } from 'mysql2';
import router from './routes.js';

const app = express();

const PORT = process.env.SERVER_PORT || 3008;

app.get('/', (_req, res) => {
  res.send('hello');
});

app.get('/movies', (_req, res) => {
  db.query('SELECT * FROM movie', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  db.query<RowDataPacket[]>(
    `SELECT * FROM movie WHERE id = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      res.json(results[0]);
    }
  );
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
