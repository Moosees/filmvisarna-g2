import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2';
import db from '../config/connectDB.js';
import { reservationEmitter } from './reservationsController.js';

interface AllSeats extends RowDataPacket {
  title: string;
  date: string;
  time: string;
  screeningId: number;
  poster: string;
  tickets: {
    ticketId: number;
    name: string;
    price: number;
  };
  seats: [
    {
      row: number;
      number: number;
      seatId: number;
      free: 1 | 0;
    },
  ];
}

const getAllSeats = async (req: Request, res: Response) => {
  try {
    const { screening_id } = req.params;

    await db.execute('SET lc_time_names = "sv_SE"');
    const [results]: [AllSeats[], FieldPacket[]] = await db.execute(
      'SELECT * FROM view_all_seats WHERE screeningId =?',
      [screening_id]
    );

    if (results.length === 0) {
      res.status(404).json({ message: 'Visning hittades inte' });
      return;
    }

    const rows = Math.max(...results[0].seats.map((seats) => seats.row));

    const parsedSeats = results[0].seats.reduce(
      (acc: { seatId: number; free: boolean; number: number }[][], seat) => {
        const { row, number, free, seatId } = seat;

        acc[row - 1].push({ seatId, number, free: Boolean(free) });

        return acc;
      },
      [...Array(rows)].map(() => [])
    );

    parsedSeats.forEach((row) => {
      row.sort((a, b) => a.number - b.number);
    });

    const responseData = {
      ...results[0],
      seats: parsedSeats.map((row) => {
        return row.map(({ seatId, free }) => ({ seatId, free }));
      }),
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Något gick fel' });
  }
};

const streamSeatsUpdates = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const keepAliveFn = () => {
    res.write('event: keep-alive\n\n');
  };
  const keepAliveMs = 5000;
  let keepAliveTimer = setInterval(keepAliveFn, keepAliveMs);

  const endSeatUpdates = () => {
    reservationEmitter.off('updateRes', sendSeatUpdate);
    clearInterval(keepAliveTimer);
    res.end();
  };

  const sendSeatUpdate = (updateId: number) => {
    try {
      clearInterval(keepAliveTimer);
      res.write(`data: ${updateId}\n\n`);
      keepAliveTimer = setInterval(keepAliveFn, keepAliveMs);
    } catch (error) {
      console.error('seatUpdates error:', error);
      endSeatUpdates();
    }
  };

  req.on('close', () => {
    endSeatUpdates();
  });

  reservationEmitter.on('updateRes', sendSeatUpdate);
};

export default {
  getAllSeats,
  streamSeatsUpdates,
};
