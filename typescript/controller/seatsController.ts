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
  start_time: string;
  screeningId: number;
  auditorium: string;
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

    const [results]: [AllSeats[], FieldPacket[]] = await db.execute(
      'SELECT * FROM vy_all_seats WHERE screeningId =?',
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

    res
      .status(200)
      .json({ message: 'Visning hittades', results: responseData });
  } catch (error) {
    res.status(500).json({ message: 'Något gick fel', error });
  }
};

export default { getReservedSeats, getOreservedSeats, getAllSeats };
