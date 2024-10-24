import { createBrowserRouter } from 'react-router-dom';
import { getQueryClient } from './api/clients';
import { reserveLoader } from './api/reserve';
import { bookingLoader } from './api/booking';
import App from './App';
import BookingConfirmation from './pages/bookingConfirmation/bookingConfirmation';
import HomePage from './pages/homepage/HomePage';
import MovieDetailsPage from './pages/movieDetails/MovieDetailsPage';
import LoginPage from './pages/loginpage/LoginPage';
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
        path: '/visning/:screeningId',
        element: <ReservePage />,
        handle: {
          title: 'Boka platser',
        },
        loader: reserveLoader(getQueryClient()),
      },
      {
        path: '/bekräftelse/:reservationNum',
        element: <BookingConfirmation />,
        handle: {
          title: 'Bekräftelse',
        },
        loader: bookingLoader(getQueryClient()),
      },
      {
        path: '/film/:id',
        element: <MovieDetailsPage />,
      },
    ],
  },
]);

export default router;
