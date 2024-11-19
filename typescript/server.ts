import './config/dotenv.js';

import express from 'express';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import sessionStore from './config/sessionStore.js';
import router from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(sessionStore);

// Backend routes
app.use('/api', router);

// Host frontend in production
const distFolder = path.join(__dirname, '../dist/');
app.use(express.static(distFolder));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distFolder + 'index.html'));
});

// Start server
const PORT = process.env.SERVER_PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
