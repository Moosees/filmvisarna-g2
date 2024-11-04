import mysql, { PoolOptions } from 'mysql2/promise';
import { allTables } from './dbTables.js';
import { allViews } from './dbViews.js';

export const dbOptions: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  namedPlaceholders: true,
  charset: 'utf8mb4',
  dateStrings: true,
};

const db = mysql.createPool(dbOptions);

const setup = {
  createTables: false,
  createViews: false,
};

// Testa anslutningen
db.getConnection()
  .then((con) => {
    if (setup.createTables) {
      console.log('Creating tables...');
      allTables.forEach(async (view) => {
        await con.query(view);
      });
    }

    if (setup.createViews) {
      console.log('Creating views...');
      allViews.forEach(async (view) => {
        await con.query(view);
      });
    }

    console.log(`Connected to MySQL ${process.env.DB_NAME} database!`);
    db.releaseConnection(con);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message || error);
  });

export default db;
