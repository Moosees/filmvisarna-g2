import mysql, { PoolOptions } from 'mysql2/promise';
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

// Testa anslutningen
db.getConnection()
  .then((con) => {
    // console.log('Setting up database...');
    // allViews.forEach(async (view) => {
    //   await con.query(view);
    // });

    console.log(`Connected to MySQL ${process.env.DB_NAME} database!`);
    db.releaseConnection(con);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message || error);
  });

export default db;
