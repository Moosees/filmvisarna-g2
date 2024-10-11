// import { Request, Response } from 'express';
import db from '../config/connectDB.js';

export const createNewReservation = async () => {
  try {
    await db.beginTransaction();
    const result1 = await db.execute(
      'CALL create_reservation(:email, :screeningId, @reservationId);',
      { email: 'node@test.com', screeningId: 5 }
    );
    console.log(result1);

    const result2 = await db.execute(
      `INSERT INTO reservation_ticket (reservation_id, ticket_id) VALUES ${createInsertTemplate(1, 2)};`,
      [1, 2]
    );
    console.log(result2);

    const result3 = await db.query(
      'SELECT * FROM reservation_ticket rt WHERE rt.reservation_id = @reservationId'
    );
    console.log(result3);

    await db.rollback();
    await db.end();

    // res.status(200).json();
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error });
  }
};

const createInsertTemplate = (cols: number, rows: number) => {
  const row = '(@reservationId, ' + new Array(cols).fill('?').join(', ') + ')';
  return new Array(rows).fill(row).join(', ');
};
