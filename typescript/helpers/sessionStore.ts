import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import db from '../config/connectDB.js';

const MySQLStore = MySQLStoreFactory(session);

export default function sessionStore() {
  return new MySQLStore({}, db);
}
