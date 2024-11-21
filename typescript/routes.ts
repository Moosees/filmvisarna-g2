import express from 'express';
import eventController from './controller/eventController.js';
import moviesController from './controller/moviesController.js';
import reservationsController from './controller/reservationsController.js';
import seatsController from './controller/seatsController.js';
import usersController from './controller/usersController.js';
import { isAdmin, isAuthenticated } from './middleware/authMiddleware.js';
import profileController from './controller/profileController.js';
import bookingsController from './controller/bookingsController.js';
import authController from './controller/authController.js';

const router = express.Router();

// get what seats are free or reserved by other people
router.get('/seats/:screening_id', seatsController.getAllSeats);

// Server-Sent Events (SSE) route for real-time seat updates
router.get('/seatsupdates', seatsController.streamSeatsUpdates);

// get info for a specific reservation
router.get(
  '/reservation/:reservationNum',
  reservationsController.getSpecificReservation
);

// create a reservation for a movie screening
router.post('/reservation', reservationsController.createNewReservation);

// cancel a reservation
router.delete('/reservation', reservationsController.cancelReservation);

// Movie routes
// find movie(s) by filtering (age, date)
router.get('/movie', moviesController.filterMovies);
// Get movies to be shown today
router.get('/todaysMovies', moviesController.getTodaysMovie);
// Show movie details and screening times
router.get('/movie/:paramUrl', moviesController.getMovie);

// Admin routes
router.post('/movie', isAdmin, moviesController.addMovie);
router.get('/movies', isAdmin, moviesController.getAllMovies);
router.put('/movie/:id', isAdmin, moviesController.updateMovie);
router.delete('/movie/:id', isAdmin, moviesController.deleteMovie);
// router.get('/users', isAuthenticated, isAdmin, usersController.getAllUsers);

// User routes
// register a member - body: {email, password, firstName, lastName}
router.post('/user/register', authController.register);

// log out
router.delete('/user', isAuthenticated, authController.logout);

// log in - body: {email, password}
router.post('/user', authController.login);

//retrieve booking history for a logged in user
router.get(
  '/user/booking-history',
  isAuthenticated,
  bookingsController.getBookingHistory
);

router.get(
  '/user/current-bookings',
  isAuthenticated,
  bookingsController.getCurrentBookings
);

router.get(
  '/user/member-info',
  isAuthenticated,
  profileController.getMemberInfo
);

//retrieve profile page, with member info and current bookings and booking history
router.get(
  '/user/profile-page',
  isAuthenticated,
  profileController.getProfilePage
);

// update user info - body: {password?, firstName?, lastName?}
router.patch('/user', profileController.updateUserDetails);

router.get('/ping', usersController.ping);

// Event routes
router.get('/event/scary-movies', eventController.getAllScaryMovies);

router.get(
  '/event/astrid-lindgren',
  eventController.getAllAstridLindgrenMovies
);

export default router;
