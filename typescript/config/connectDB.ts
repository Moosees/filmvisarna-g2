import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  namedPlaceholders: true,
});

// Testa anslutningen
db.getConnection()
  .then(() => {
    console.log(`Connected to MySQL ${process.env.DB_NAME} database!`);
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message || err);
  });

export default db;
