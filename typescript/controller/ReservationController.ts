import { NextFunction, Request, Response } from 'express';
import db from '../config/connectDB.js';

interface CreateNewReservationRequest extends Request {
  body: {
    email: string;
    screeningId: number;
    tickets: number[];
    seats: number[];
  };
}

const createNewReservation = async (
  req: CreateNewReservationRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, screeningId, tickets, seats } = req.body;

  if (!email || !screeningId || tickets?.length === 0 || seats?.length === 0) {
    res.status(400).json({ error: 'Bokningen är inte korrekt' });
    return;
  }

  try {
    await db.beginTransaction();
    await db.execute(
      'CALL create_reservation(:email, :screeningId, @reservationId);',
      { email, screeningId }
    );

    await db.execute(
      `INSERT INTO reservation_ticket (reservation_id, ticket_id) VALUES ${createInsertTemplate(1, tickets.length)};`,
      tickets
    );

    await db.execute(
      `INSERT INTO res_seat_screen (reservation_id, seat_id, screening_id) VALUES ${createInsertTemplate(2, seats.length)}`,
      seats.reduce(
        (data: number[], seat: number) => [...data, seat, screeningId],
        []
      )
    );

    await db.commit();

    next();
  } catch (error) {
    console.log(error);
    await db.rollback();
    res.status(500).json({ error });
  } finally {
    await db.end();
  }
};

const createInsertTemplate = (cols: number, rows: number) => {
  const row = '(@reservationId, ' + new Array(cols).fill('?').join(', ') + ')';
  return new Array(rows).fill(row).join(', ');
};

export default { createNewReservation };
