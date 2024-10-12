import './config/dotenv.js';
import express from 'express';
import router from './routes.js';

const app = express();

app.use(express.json());

const PORT = process.env.SERVER_PORT || 3008;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
