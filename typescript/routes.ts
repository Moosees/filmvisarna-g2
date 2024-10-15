import express from 'express';
import moviesController from './controller/MoviesController.js';
import reservationsController from './controller/reservationsController.js';
import seatsController from './controller/seatsController.js';
import ticketsController from './controller/ticketsController.js';
import usersController from './controller/UserController.js';

const router = express.Router();

// NOTE: use socket.io or server sent events for handling this
// get what seats are free or reserved by other people
router.get('/seats/:screening_id', seatsController.getReservedSeats);

// get info for a specific reservation
router.get(
  '/reservation/:reservationNum',
  reservationsController.getSpecificReservation
);

// get ticket price
router.get('/ticket', ticketsController.getTicketPrice);

// create a reservation for a movie screening
router.post('/reservation', reservationsController.createNewReservation);

// remove seats from reservation (if we send a new request to replace the old one, maybe PUT instead of PATCH)
// body: {reservationNum, seatsToRemove}
router.patch('/reservation');

// cancel a reservation - body: {reservationNum}
router.delete('/reservation');

// find a movie from url
router.get('/movie/:id', moviesController.getSpecificMovie);

// find movie(s) by filtering (age, date) (use req.query for filtering or split into separate routes?)
router.get('/movie');

// register a member - body: {email, password, firstName, lastName}
router.post('/user/register', usersController.register);

// router.get('/users', usersController.getAllUsers);

// log out
router.delete('/user');

// log in - body: {email, password}
router.post('/user', usersController.login);

// update user info - body: {email?, password?, firstName?, lastName?}
router.patch('/user');

export default router;
