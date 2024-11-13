import { createBrowserRouter } from 'react-router-dom';
import { bookingLoader } from './api/booking';
import { cancelAction } from './api/cancel';
import { getQueryClient } from './api/clients';
import { detailsLoader } from './api/details';
import { eventMoviesLoader } from './api/event';
import { filterLoader } from './api/filter';
import { TodaysMoviesLoader } from './api/home';
import { loginAction } from './api/login';
import { reserveAction, reserveLoader } from './api/reserve';
import { rootLoader } from './api/root';
import App from './App';
import CinemaTechnology from './components/cinema-technology/cinemaTechnology';
import AboutPage from './pages/aboutPage/AboutPage';
import BookingConfirmation from './pages/bookingConfirmation/bookingConfirmation';
import CancelReservationPage from './pages/cancelReservation/CancelReservation';
import EventPage from './pages/eventpage/EventPage';
import FilterPage from './pages/filterPage/FilterPage';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';
import MovieDetailsPage from './pages/movieDetails/MovieDetailsPage';
import ProfilePage from './pages/profilepage/ProfilePage';
import RegisterPage from './pages/registerpage/RegisterPage';
import ReservePage from './pages/reservepage/ReservePage';
import Snacks from './pages/snacks/snacksPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: rootLoader(getQueryClient()),
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: {
          title: 'Dagens filmer',
        },
        loader: TodaysMoviesLoader(getQueryClient()),
      },
      {
        path: '/medlem/bli-medlem',
        element: <RegisterPage />,
        handle: {
          title: 'Bli medlem',
        },
      },
      {
        path: '/medlem/medlems-sida',
        element: <ProfilePage />,
        handle: {
          title: 'Medlem',
        },
      },
      {
        path: '/medlem/logga-in',
        element: <LoginPage />,
        handle: {
          title: 'Logga in',
        },
        action: loginAction(getQueryClient()),
      },
      {
        path: '/filmer',
        element: <FilterPage />,
        handle: {
          title: 'Kommande Filmer',
        },
        loader: filterLoader(getQueryClient()),
      },
      {
        path: '/film/:id',
        element: <MovieDetailsPage />,
        loader: detailsLoader(getQueryClient()),
      },
      {
        path: '/visning/:screeningId',
        element: <ReservePage />,
        handle: {
          title: 'Boka platser',
        },
        loader: reserveLoader(getQueryClient()),
        action: reserveAction,
      },
      {
        path: '/bokning/:reservationNum',
        element: <BookingConfirmation />,
        handle: {
          title: 'Bekräftelse',
        },
        loader: bookingLoader(getQueryClient()),
      },
      {
        path: '/avbokning',
        element: <CancelReservationPage />,
        handle: {
          title: 'Avboka',
        },
        action: cancelAction(getQueryClient()),
      },
      {
        path: '/evenemang',
        element: <EventPage />,
        handle: {
          title: 'Evenemang',
        },
        loader: eventMoviesLoader(getQueryClient()),
      },
      {
        path: '/godis',
        element: <Snacks />,
        handle: {
          title: 'Godis',
        },
      },
      {
        path: '/teknik',
        element: <CinemaTechnology />,
        handle: {
          title: 'Teknik',
        },
      },
      {
        path: '/om-oss',
        element: <AboutPage />,
        handle: {
          title: 'Om oss',
        },
      },
    ],
  },
]);

export default router;
