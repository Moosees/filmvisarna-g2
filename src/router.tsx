import { createBrowserRouter } from 'react-router-dom';
import { bookingLoader } from './api/booking';
import { getQueryClient } from './api/clients';
import { reserveLoader } from './api/reserve';
import App from './App';
import BookingConfirmation from './pages/bookingConfirmation/bookingConfirmation';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';
import MovieDetailsPage from './pages/movieDetails/MovieDetailsPage';
import RegisterPage from './pages/registerpage/RegisterPage';
import ReservePage from './pages/reservepage/ReservePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: {
          title: 'Dagens filmer',
        },
      },
      {
        path: '/medlem/bli-medlem',
        element: <RegisterPage />,
        handle: {
          title: 'Bli medlem',
        },
      },
      {
        path: '/medlem/logga-in',
        element: <LoginPage />,
        handle: {
          title: 'Bli medlem',
        },
      },
      {
        path: '/film/:id',
        element: <MovieDetailsPage />,
      },
      {
        path: '/visning/:screeningId',
        element: <ReservePage />,
        handle: {
          title: 'Boka platser',
        },
        loader: reserveLoader(getQueryClient()),
      },
      {
        path: '/bokning/:reservationNum',
        element: <BookingConfirmation />,
        handle: {
          title: 'Bekräftelse',
        },
        loader: bookingLoader(getQueryClient()),
      },
    ],
  },
]);

export default router;
