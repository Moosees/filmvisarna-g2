// import { Request, Response } from 'express';
import db from '../config/connectDB.js';

const mockReservation = {
  email: 'node@test.com',
  screeningId: 5,
  tickets: [1, 2],
  seats: [2, 3],
};

export const createNewReservation = async () => {
  const { email, screeningId, tickets, seats } = mockReservation;

  try {
    await db.beginTransaction();
    const result1 = await db.execute(
      'CALL create_reservation(:email, :screeningId, @reservationId);',
      { email, screeningId }
    );
    console.log(result1);

    const result2 = await db.execute(
      `INSERT INTO reservation_ticket (reservation_id, ticket_id) VALUES ${createInsertTemplate(1, 2)};`,
      tickets
    );
    console.log(result2);

    const result3 = await db.query(
      'SELECT * FROM reservation_ticket rt WHERE rt.reservation_id = @reservationId'
    );
    console.log(result3);

    const result4 = await db.execute(
      `INSERT INTO res_seat_screen (reservation_id, seat_id, screening_id) VALUES ${createInsertTemplate(2, 2)}`,
      seats.reduce(
        (data: number[], seat: number) => [...data, seat, screeningId],
        []
      )
    );
    console.log(result4);

    const result5 = await db.query(
      'SELECT * FROM res_seat_screen rss WHERE rss.reservation_id = @reservationId'
    );
    console.log(result5);

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
