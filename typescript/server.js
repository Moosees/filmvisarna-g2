import express from 'express';
import db from './config/connectDB.js';
const app = express();

const PORT = process.env.SERVER_PORT || 3008;

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/movies', (req, res) => {
  db.query('SELECT * FROM movie', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
