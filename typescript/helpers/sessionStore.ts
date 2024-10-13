import MySQLStore from 'express-mysql-session';
import db from '../config/connectDB';

export default function sessionStore(): MySQLStore {
  const options = {
    createDatabaseTable: true,
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  };

  return new MySQLStore(options, db);
}
