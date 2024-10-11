// import { Request, Response } from 'express';
import db from '../config/connectDB.js';

export const createNewReservation = async () => {
  try {
    await db.beginTransaction();
    await db.execute(
      'CALL create_reservation(:email, :screeningId, @member_id);',
      { email: 'node@test.com', screeningId: 5 }
    );
    const result = await db.query('SELECT @member_id');
    console.log(result);
    await db.rollback();
    await db.end();

    // res.status(200).json();
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error });
  }
};
