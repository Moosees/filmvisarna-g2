import express from 'express';

const app = express();

const PORT = 3004;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`server is running port http://localhost:${PORT}`);
});
