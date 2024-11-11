import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise.js';
import db from '../config/connectDB.js';
import sendEmail from '../utils/sendEmail.js';

interface CreateNewReservationRequest extends Request {
  body: {
    email: string;
    screeningId: number;
    ticketIds: string;
    seatIds: string;
  };
}

interface ReservationData extends RowDataPacket {
  reservationId: number;
  reservationNum: string;
}

interface Seat {
  row: number;
  number: number;
  seatId: number;
}

// Helpers
const createInsertTemplate = (cols: number, rows: number) => {
  const row = '(' + new Array(cols).fill('?').join(', ') + ')';
  return new Array(rows).fill(row).join(', ');
};

const insertTicketsAndSeatsIntoReservation = async (
  con: PoolConnection,
  reservationId: number,
  screeningId: number,
  tickets: number[],
  seats: number[]
) => {
  await con.execute(
    `INSERT INTO reservation_ticket (reservation_id, ticket_id) VALUES ${createInsertTemplate(
      2,
      tickets.length
    )};`,
    tickets.reduce(
      (data: number[], ticket: number) => [...data, reservationId, ticket],
      []
    )
  );

  await con.execute(
    `INSERT INTO res_seat_screen (reservation_id, seat_id, screening_id) VALUES ${createInsertTemplate(
      3,
      seats.length
    )}`,
    seats.reduce(
      (data: number[], seat: number) => [
        ...data,
        reservationId,
        seat,
        screeningId,
      ],
      []
    )
  );
};

const deleteSeatsAndTicketsFromReservation = async (
  con: PoolConnection,
  reservationNum: string,
  email: string
) => {
  const query = `
      DELETE rss, rt
      FROM reservation r
      INNER JOIN res_seat_screen rss ON rss.reservation_id = r.id
      INNER JOIN reservation_ticket rt ON rt.reservation_id = r.id
      INNER JOIN user u ON u.id = r.user_id
      WHERE r.reservation_num = :reservationNum AND u.user_email = :email;`;
  await con.execute(query, { reservationNum, email });
};

// Route Controllers
const createNewReservation = async (
  req: CreateNewReservationRequest,
  res: Response
) => {
  const { email, screeningId, ticketIds, seatIds } = req.body;
  const userEmail = email || req.session.user?.email;

  if (
    (!email && !req.session.user?.email) ||
    !screeningId ||
    !ticketIds ||
    !seatIds
  ) {
    res.status(400).json({ error: 'Bokningen är inte korrekt ifylld' });
    return;
  }

  const seats = seatIds.split(',').map((seat) => +seat);
  const tickets = ticketIds.split(',').map((ticket) => +ticket);
  if (
    tickets.length === 0 ||
    seats.length === 0 ||
    tickets.length !== seats.length
  ) {
    res.status(400).json({ error: 'Bokningen är inte korrekt ifylld' });
    return;
  }

  let con;
  try {
    con = await db.getConnection();
    await con.beginTransaction();

    const [result] = await con.execute<ReservationData[]>(
      'CALL create_reservation(:email, :screeningId);',
      { email: email || req.session.user?.email, screeningId }
    );
    const { reservationId, reservationNum } = result[0][0];

    await insertTicketsAndSeatsIntoReservation(
      con,
      reservationId,
      screeningId,
      tickets,
      seats
    );

    await con.commit();

    //-------------------------MAILER-----------------------------
    // ------------------------------------------------------

    function formatSeats(seats: Seat[]): string {
      return seats
        .map((seat) => `Rad: ${seat.row}, Plats: ${seat.number}`)
        .join('<br>');
    }

    const [reservationDetails]: [RowDataPacket[], FieldPacket[]] =
      await db.execute(
        'SELECT * FROM vy_reservationDetails vrd WHERE reservationNumber = ?',
        [reservationNum]
      );

    if (reservationDetails.length === 0) {
      res.status(500).json({ message: 'Bokningsdetaljer kunde inte hämtas' });
      return;
    }

    const bookingDetails = reservationDetails[0];

    // const html = `
    //   <h1>Bokning lyckades!</h1>
    //   <p><strong>Bokningsnummer:</strong> ${
    //     bookingDetails.reservationNumber
    //   }</p>
    //   <p><strong>Salong:</strong> ${bookingDetails.auditoriumName}</p>
    //   <p><strong>Filmtitel:</strong> ${bookingDetails.title}</p>
    //   <p><strong>Datum:</strong> ${bookingDetails.startDate}</p>
    //   <p><strong>Tid:</strong> ${bookingDetails.timeRange}</p>
    //   <p><strong>Platser:</strong> ${formatSeats(bookingDetails.seats)}</p>

    //   <p><strong>Antal personer:</strong> ${bookingDetails.ticketDetails}</p>
    //   <p><strong>Totalt pris:</strong> ${bookingDetails.totalPrice}</p>
    // `;

    const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #3e1e3d; padding: 20px;">
             <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
               <h1 style="background-color: #ff94e0; color: #3e1e3d; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; margin: 0;">
                Filmvisarna
             </h1>
               <h2 style="color: #3e1e3d; margin-top: 20px;">Tack för din bokning hos Filmvisarna!</h2>
               <p style="color: #3e1e3d;">Hej!</p>
               <p style="color: #3e1e3d;">Vi är glada att bekräfta din bokning. Här är en sammanfattning:</p>
               <ul style="background-color: #ff94e0; padding: 15px; border-radius: 8px; color: #3e1e3d;">
                 <li><strong>Boknings-nr:</strong> ${
                   bookingDetails.reservationNumber
                 }</li>
                 <li><strong>Salong:</strong> ${
                   bookingDetails.auditoriumName
                 }</li>
                 <li><strong>Plats:</strong> ${formatSeats(
                   bookingDetails.seats
                 )}</li>
                 <li><strong>Film:</strong> ${bookingDetails.title}</li>
                 <li><strong>Datum:</strong> ${bookingDetails.startDate}</li>
                 <li><strong>Tid:</strong> ${bookingDetails.timeRange}</li>
                <li><strong>Antal personer:</strong> ${
                  bookingDetails.ticketDetails
                }</li>
                <li><strong>Totalt pris:</strong> ${
                  bookingDetails.totalPrice
                }</li>

               </ul>
               <p style="margin-top: 20px; color: #3e1e3d;">Vi ser fram emot att välkomna dig! Om du har några frågor, tveka inte att kontakta oss.</p>
               <p style="color: #3e1e3d;">Med vänliga hälsningar,<br />Filmvisarna</p>
               <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
               <p style="font-size: 12px; color: #888;">Filmvisarna AB | Adressvägen 123, 111 22 Stockholm</p>
            </div>
           </div>
         `;

    await sendEmail(userEmail, 'Boking lyckades', html);
    res.status(200).json({
      message: 'Vi har skickat en bokning till din mail',
      reservationNum,
    });

    console.log(html);

    console.log('Email sent successfully');
  } catch (error) {
    console.log(error);
    await con?.rollback();
    res.status(500).json({ message: 'Någonting gick fel' });
  } finally {
    con?.release();
  }
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
      res.status(404).json({ message: 'Bokning kunde inte hittas' });
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
    reservationNum: string;
  };
}

const cancelReservation = async (
  req: CancelReservationRequest,
  res: Response
) => {
  const { email, reservationNum } = req.body;
  if (!email || !reservationNum) {
    res
      .status(400)
      .json({ error: 'Bokningen saknar e-post eller bokningsnummer' });
    return;
  }
  console.log(email, reservationNum);

  let con;

  const [reservationDetails]: [RowDataPacket[], FieldPacket[]] =
    await db.execute(
      'SELECT * FROM vy_reservationDetails vrd WHERE reservationNumber = ?',
      [reservationNum]
    );

  if (reservationDetails.length === 0) {
    res.status(500).json({ message: 'Bokningsdetaljer kunde inte hämtas' });
    return;
  }

  const bookingDetails = reservationDetails[0];

  const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #3e1e3d; padding: 20px;">
             <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
               <h1 style="background-color: #ff94e0; color: #3e1e3d; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; margin: 0;">
                Filmvisarna
             </h1>
               <h2 style="color: #3e1e3d; margin-top: 20px;">Din avboknings bekräftelse!</h2>
               <ul style="background-color: #ff94e0; padding: 15px; border-radius: 8px; color: #3e1e3d;">
                 <li><strong>Boknings-nr:</strong> ${bookingDetails.reservationNumber}</li>
                 <li><strong>Film:</strong> ${bookingDetails.title}</li>
                 <li><strong>Datum:</strong> ${bookingDetails.startDate}</li>
                <li><strong>Antal personer:</strong> ${bookingDetails.ticketDetails}</li>
                <li><strong>Totalt pris:</strong> ${bookingDetails.totalPrice}</li>
               </ul>
               <p style="margin-top: 20px; color: #3e1e3d;">Vi ser fram emot att välkomna dig! Om du har några frågor, tveka inte att kontakta oss.</p>
               <p style="color: #3e1e3d;">Med vänliga hälsningar,<br />Filmvisarna</p>
               <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
               <p style="font-size: 12px; color: #888;">Filmvisarna AB | Adressvägen 123, 111 22 Stockholm</p>
            </div>
           </div>
         `;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    deleteSeatsAndTicketsFromReservation(con, reservationNum, email);

    await con.execute(
      'delete from reservation r where r.reservation_num = :reservationNum;',
      { reservationNum }
    );

    await con.commit();
    // Ev. byta till 204 istället
    res.status(200).json({ message: 'Avbokning lyckades' });
    await sendEmail(email, 'Boking lyckades', html);
    res.status(200).json({
      message: 'Vi har skickat en bokning till din mail',
      reservationNum,
    });
  } catch (error) {
    await con?.rollback();
    res.status(500).json({ message: 'Någonting gick fel', error });
  } finally {
    con?.release();
  }
};

interface ChangeReservationRequest extends Request {
  body: {
    reservationNum: string;
    email: string;
    tickets: number[];
    seats: number[];
  };
}

interface ReservationIdPacket extends RowDataPacket {
  reservationId: number;
}

const changeReservation = async (
  req: ChangeReservationRequest,
  res: Response
) => {
  const { reservationNum, email, tickets, seats } = req.body;

  if (
    !reservationNum ||
    !email ||
    tickets?.length === 0 ||
    seats?.length === 0
  ) {
    res.status(400).json({ message: 'Ombokningen är inte korrekt ifylld' });
  }

  let con;
  try {
    con = await db.getConnection();
    await con.beginTransaction();

    const [result] = await con.execute<ReservationIdPacket[]>(
      `
        SELECT r.id AS reservationId, r.screening_id AS screeningId FROM reservation r
        INNER JOIN user u ON u.id = r.user_id
        WHERE r.reservation_num = :reservationNum AND u.user_email = :email
      `,
      { reservationNum, email }
    );

    if (result?.length === 0) {
      res.status(400).json('Kunde inte hitta bokningen');
      return;
    }

    const { reservationId, screeningId } = result[0];

    await deleteSeatsAndTicketsFromReservation(con, reservationNum, email);
    await insertTicketsAndSeatsIntoReservation(
      con,
      reservationId,
      screeningId,
      tickets,
      seats
    );

    await con.commit();

    res.status(200).json({ message: 'Ombokningen lyckades', reservationNum });
  } catch (error) {
    await con?.rollback();
    console.log(error);
    res.send(500).json({ message: 'Kunde inte slutföra ombokningen' });
  } finally {
    con?.release();
  }
};

export default {
  createNewReservation,
  getSpecificReservation,
  cancelReservation,
  changeReservation,
};
