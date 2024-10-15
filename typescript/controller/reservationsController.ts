import { NextFunction, Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2';
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

  let con;
  try {
    con = await db.getConnection();
    await con.beginTransaction();
    await con.execute(
      'CALL create_reservation(:email, :screeningId, @reservationId);',
      { email, screeningId }
    );

    await con.execute(
      `INSERT INTO reservation_ticket (reservation_id, ticket_id) VALUES ${createInsertTemplate(
        1,
        tickets.length
      )};`,
      tickets
    );

    await con.execute(
      `INSERT INTO res_seat_screen (reservation_id, seat_id, screening_id) VALUES ${createInsertTemplate(
        2,
        seats.length
      )}`,
      seats.reduce(
        (data: number[], seat: number) => [...data, seat, screeningId],
        []
      )
    );

    await con.commit();

    next();
  } catch (error) {
    console.log(error);
    await con?.rollback();
    res.status(500).json({ error });
  } finally {
    con?.release();
  }
};

const createInsertTemplate = (cols: number, rows: number) => {
  const row = '(@reservationId, ' + new Array(cols).fill('?').join(', ') + ')';
  return new Array(rows).fill(row).join(', ');
};

const getSpecificReservation = async (req: Request, res: Response) => {
  try {
    const { reservationNum } = req.params;

    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      'SELECT * FROM vy_reservationDetails vrd WHERE reservationNumber =?',
      [reservationNum]
    );

    // Check if the reservation was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Bokning inte hittad' });
      return;
    }

    // Return the found reservation
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

interface CancelReservationRequest extends Request {
  body: {
    email: string;
    bookingNumber: string;
  };
}

const cancelReservation = async (
  req: CancelReservationRequest,
  res: Response
) => {
  const { email, bookingNumber } = req.body;
  if (!email || !bookingNumber) {
    res.status(400).json({ error: 'Hittar ej email eller bokningsnummer' });
    return;
  }
  try {
    // hej
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

export default {
  createNewReservation,
  getSpecificReservation,
  cancelReservation,
};
