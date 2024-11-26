import mysql, { PoolOptions } from 'mysql2/promise';
import { Job } from 'node-schedule';
import { allData } from './dbData.js';
import { scheduleMovieMover } from './dbSchedule.js';
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
  createData: false,
  createViews: false,
};

let movieMoverJob: Job | undefined;

// Testa anslutningen
db.getConnection()
  .then((con) => {
    if (setup.createTables) {
      console.log('Creating tables...');
      allTables.forEach(async (table) => {
        await con.query(table);
      });
    }

    if (setup.createData) {
      console.log('Creating data...');
      allData.forEach(async (data) => {
        await con.query(data);
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

    if (!movieMoverJob) movieMoverJob = scheduleMovieMover();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message || error);
    if (movieMoverJob) movieMoverJob.cancel();
  });

export default db;
