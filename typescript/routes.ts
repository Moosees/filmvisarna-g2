import express from 'express';
import moviesController from './controller/moviesController.js';
import reservationsController from './controller/reservationsController.js';
import seatsController from './controller/seatsController.js';
import ticketsController from './controller/ticketsController.js';
import { isAdmin, isAuthenticated } from './middleware/authMiddleware.js';
import usersController from './controller/usersController.js';
import Mailer from './helpers/nodemailer.js';
import eventController from './controller/eventController.js';

const router = express.Router();

// get what seats are reserved by other people
router.get('/reservedSeats/:screening_id', seatsController.getReservedSeats);
// get seats not reserved by other people
router.get(
  '/unreservedSeats/:screedning_id',
  seatsController.getOreservedSeats
);
// get what seats are free or reserved by other people
router.get('/seats/:screening_id', seatsController.getAllSeats);

// Server-Sent Events (SSE) route for real-time seat updates
router.get('/seatsupdates', seatsController.streamSeatsUpdates);

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

// Movie routes
// find movie(s) by filtering (age, date)
router.get('/movie', moviesController.filterMovies);
// Get movies to be shown today
router.get('/todaysMovies', moviesController.getTodaysMovie);
// Show movie details and screening times
router.get('/movie/:paramUrl', moviesController.getMovie);

//---------------- Admin routes
router.post('/movie', isAdmin, moviesController.addMovie);
router.get('/movies', isAdmin, moviesController.getAllMovies);
router.put('/movie/:id', isAdmin, moviesController.updateMovie);
router.delete('/movie/:id', isAdmin, moviesController.deleteMovie);

//--------------- end movies routes ----------------------

// register a member - body: {email, password, firstName, lastName}
router.post('/user/register', usersController.register);

// router.get('/users', isAuthenticated, isAdmin, usersController.getAllUsers);

// log out
router.delete('/user', isAuthenticated, usersController.logout);

// log in - body: {email, password}
router.post('/user', usersController.login);

//retrieve booking history for a logged in user
router.get(
  '/user/booking-history',
  isAuthenticated,
  usersController.getBookingHistory
);

router.get(
  '/user/current-bookings',
  isAuthenticated,
  usersController.getCurrentBookings
);

router.get('/user/member-info', isAuthenticated, usersController.getMemberInfo);

//retrieve profile page, with member info and current bookings and booking history
router.get(
  '/user/profile-page',
  isAuthenticated,
  usersController.getProfilePage
);

// update user info - body: {password?, firstName?, lastName?}
router.patch('/user', usersController.updateUserDetails);

router.get('/ping', usersController.ping);

router.get('/event/scary-movies', eventController.getAllScaryMovies);

router.get(
  '/event/astrid-lindgren',
  eventController.getAllAstridLindgrenMovies
);

router.post('/send-email', (req, res) => {
  const { to, subject, text, html, attachments } = req.body;

  console.log('Sending email with details:', {
    to,
    subject,
    text,
    html,
    attachments,
  });

  try {
    Mailer.send(to, subject, text, html, attachments);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

export default router;
