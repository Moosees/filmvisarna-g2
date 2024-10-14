import './config/dotenv.js';
import express from 'express';
import session from 'express-session';
import sessionStore from './helpers/sessionStore.js';
import router from './routes.js';

const app = express();

app.use(express.json());

const PORT = process.env.SERVER_PORT || 3008;

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'yourFallbackSecret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore(),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
