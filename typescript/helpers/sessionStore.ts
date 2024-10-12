import MySQLStore from 'express-mysql-session';
import db from '../config/connectDB';

export default function sessionStore(session) {
  return new MySQLStore({}, db);
}
