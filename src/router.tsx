import { createBrowserRouter } from 'react-router-dom';
import { bookingLoader } from './api/booking';
import { getQueryClient } from './api/clients';
import { detailsLoader } from './api/details';
import { loginAction } from './api/login';
import { reserveLoader } from './api/reserve';
import App from './App';
import BookingConfirmation from './pages/bookingConfirmation/bookingConfirmation';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';
import MovieDetailsPage from './pages/movieDetails/MovieDetailsPage';
import RegisterPage from './pages/registerpage/RegisterPage';
import ReservePage from './pages/reservepage/ReservePage';
import { rootLoader } from './api/root';
import ProfilePage from './pages/profilepage/ProfilePage';

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
