import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to MySQL ${process.env.DB_NAME} database!`);
});

export default db;
