import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import db from '../config/connectDB.js';

const MySQLStore = MySQLStoreFactory(session);

export default function sessionStore() {
  const options = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  return new (MySQLStore as typeof MySQLStore)(options, db);
}
