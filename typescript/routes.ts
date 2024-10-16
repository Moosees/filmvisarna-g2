import express from 'express';
import moviesController from './controller/moviesController.js';
import reservationsController from './controller/reservationsController.js';
import seatsController from './controller/seatsController.js';
import ticketsController from './controller/ticketsController.js';
import { isAuthenticated } from './middleware/authMiddleware.js';
// import { isAdmin } from './middleware/authMiddleware.js';
import usersController from './controller/usersController.js';

const router = express.Router();

router.get('/todaysMovies', moviesController.getTodaysMovie);
router.get('/movies', moviesController.getAllMovies);
router.put('/movie/:id', moviesController.updateMovie);
router.post('/movie', moviesController.addMovie);
router.delete('/movie/:id', moviesController.deleteMovie);

// NOTE: use socket.io or server sent events for handling this
// get what seats are reserved by other people
router.get('/reservedSeats/:screening_id', seatsController.getReservedSeats);
// get what seats are free or reserved by other people
router.get('/seats/:screening_id', seatsController.getOreservedSeats);

// get info for a specific reservation
router.get(
  '/reservation/:reservationNum',
  reservationsController.getSpecificReservation
);

// get ticket price
router.get('/ticket', ticketsController.getAllTickets);

// create a reservation for a movie screening
router.post('/reservation', reservationsController.createNewReservation);

// remove seats from reservation
router.put('/reservation', reservationsController.changeReservation);

// cancel a reservation
router.delete('/reservation', reservationsController.cancelReservation);

// find a movie from url
router.get('/movie/:id', moviesController.getMovie);

// find movie(s) by filtering (age, date) (use req.query for filtering or split into separate routes?)
// this is an example explaining how the filter works:
//http://localhost:3002/movie?age=15&date=2024-11-04
router.get('/movie', moviesController.filerMovies);

// register a member - body: {email, password, firstName, lastName}
router.post('/user/register', usersController.register);

// router.get('/users', isAuthenticated, isAdmin, usersController.getAllUsers);

// log out
router.delete('/user', isAuthenticated, usersController.logout);

// log in - body: {email, password}
router.post('/user', usersController.login);

//retrieve booking history for a logged in user
router.get('/user/booking-history', usersController.getBookingHistory);

// update user info - body: {password?, firstName?, lastName?}
router.patch('/user', usersController.updateUserDetails);

export default router;
