import db from '../config/connectDB.js';
import { Request, Response } from 'express';
import { FieldPacket, RowDataPacket } from 'mysql2';

const getReservedSeats = async (req: Request, res: Response) => {
  try {
    const { screening_id } = req.params;

    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      'SELECT * FROM vy_reserverdSeats vrs WHERE screeningId = ?',
      [screening_id]
    );

    // Check if the screening was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Visning hittades inte' });
      return;
    }

    // Return the found screening
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

const getOreservedSeats = async (req: Request, res: Response) => {
  try {
    const { screening_id } = req.params;

    // Execute the SQL query
    const [results]: [RowDataPacket[], FieldPacket[]] = await db.execute(
      'SELECT * FROM vy_oReserveradePlatser vorp WHERE screeningId =?',
      [screening_id]
    );

    // Check if the screening was found
    if (results.length === 0) {
      res.status(404).json({ message: 'Visning hittades inte' });
      return;
    }

    // Return the found screening
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

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
    }
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

interface SeatUpdateData {
  screeningId: number;
  updatedSeat: {
    seatId: number;
    free: boolean;
  };
}

const streamSeatsUpdates = (req: Request, res: Response) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendSeatUpdate = (seatData: SeatUpdateData) => {
      res.write(`data: ${JSON.stringify(seatData)}\n\n`);
    };

    const interval = setInterval(async () => {
      try {
        const { screening_id } = req.params;

        // Execute query and cast the results to RowDataPacket[] for compatibility
        const [rows] = await db.execute<RowDataPacket[]>(
          `
          SELECT s.id AS seatId,
                 CASE WHEN rss.seat_id IS NULL THEN TRUE ELSE FALSE END AS free
          FROM seat s
          LEFT JOIN res_seat_screen rss
          ON s.id = rss.seat_id AND rss.screening_id = ?
          `,
          [screening_id]
        );

        // Map the rows to SeatUpdateData format
        const seatUpdates = rows.map((row) => ({
          screeningId: parseInt(screening_id, 10),
          updatedSeat: {
            seatId: row.seatId as number,
            free: Boolean(row.free),
          },
        })) as SeatUpdateData[];

        // Send each seat update to the client
        seatUpdates.forEach(sendSeatUpdate);
      } catch (error) {
        console.error('Error:', error);
        res.write(`data: ${JSON.stringify({ error: 'Något gick fel' })}\n\n`);
      }
    }, 5000);

    req.on('close', () => {
      clearInterval(interval);
      console.log('Användaren kopplade ifrån');
    });
  } catch (error) {
    console.error('Error SSE connection:', error);
    res.status(500).json({
      message: 'Något gick fel vid anslutning till seat updates',
      error,
    });
  }
};

export default {
  getReservedSeats,
  getOreservedSeats,
  getAllSeats,
  streamSeatsUpdates,
};
