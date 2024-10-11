import { Request, Response } from 'express';

const createNewReservation = (_req: Request, res: Response) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { createNewReservation };
