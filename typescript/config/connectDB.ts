import mysql, { ConnectionOptions } from 'mysql2/promise';

const options: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
};

async function connectDB() {
  try {
    const db = await mysql.createConnection(options);
    console.log(`Connected to MySQL database ${process.env.DB_NAME}!`);
    return db;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err; // Rethrow the error for further handling
  }
}

const db = await connectDB(); // Await the connection

export default db;
