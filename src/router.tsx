import { createBrowserRouter } from 'react-router-dom';
import { bookingLoader } from './api/booking';
import { getQueryClient } from './api/clients';
import { detailsLoader } from './api/details';
import { filterLoader } from './api/filter';
import { TodaysMoviesLoader } from './api/home';
import { loginAction } from './api/login';
import { reserveAction, reserveLoader } from './api/reserve';
import { rootLoader } from './api/root';
import App from './App';
import AdminMovie from './pages/admin/AdminMovie';
import BookingConfirmation from './pages/bookingConfirmation/bookingConfirmation';
import CancelReservationPage from './pages/cancelReservation/CancelReservation';
import FilterPage from './pages/filterPage/FilterPage';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';
import MovieDetailsPage from './pages/movieDetails/MovieDetailsPage';
import ProfilePage from './pages/profilepage/ProfilePage';
import RegisterPage from './pages/registerpage/RegisterPage';
import ReservePage from './pages/reservepage/ReservePage';

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
        path: '/avbokning/:reservationNum',
        element: <CancelReservationPage />,
        handle: {
          title: 'Avboka platser',
        },
      },
      {
        path: '/admin',
        children: [
          {
            path: 'film',
            element: <AdminMovie />,
            loader: () => ({ movieId: -1 }),
          },
          {
            path: 'film/:id',
            element: <AdminMovie />,
            loader: detailsLoader(getQueryClient()),
          },
        ],
      },
    ],
  },
]);

export default router;
