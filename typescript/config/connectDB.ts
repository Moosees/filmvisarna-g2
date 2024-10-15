import mysql, { PoolOptions } from 'mysql2/promise';

export const dbOptions: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  namedPlaceholders: true,
  charset: 'utf8mb4',
};

const db = mysql.createPool(dbOptions);

// Testa anslutningen
db.getConnection()
  .then((con) => {
    console.log(`Connected to MySQL ${process.env.DB_NAME} database!`);
    db.releaseConnection(con);
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message || err);
  });

export default db;
