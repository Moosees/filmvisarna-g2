import session from 'express-session';
import MySQLStore from 'express-mysql-session';

interface DatabaseSettings {
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbDatabase: string;
}

export default function sessionStore(
  settings: DatabaseSettings
): session.Store {
  const { dbHost, dbPort, dbUser, dbPassword, dbDatabase } = settings;

  const options = {
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
  };

  return new MySQLStore(options);
}
