import MySQLStoreFactory from 'express-mysql-session';
import * as session from 'express-session';
import { dbOptions } from './connectDB.js';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
    };
  }
}

const MySqlStore = MySQLStoreFactory(session);
const store = new MySqlStore(dbOptions);

store
  .onReady()
  .then(() => {
    console.log('MySQLStore ready');
  })
  .catch((error: Error) => {
    console.error(error);
  });

export default session.default({
  secret: process.env.SESSION_SECRET || 'yourFallbackSecret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60,
  },
});
