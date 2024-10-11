// import mysql, { ConnectionOptions } from 'mysql2';

// const options: ConnectionOptions = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: Number(process.env.DB_PORT) || 3306,
// };

// const db = mysql.createConnection(options);

// db.connect((err) => {
//   if (err) throw err;
//   console.log(`Connected to MySQL ${process.env.DB_NAME} database!`);
// });

// export default db;
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
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
