import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RegisterPage from './pages/registerpage/RegisterPage';
import HomePage from './pages/homepage/HomePage';
import BookingConfirmation from './pages/bookingConfirmation/bookingConfirmation';

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
        path: '/registrera',
        element: <RegisterPage />,
        handle: {
          title: 'Bli medlem',
        },
      },
      {
        path: '/bekräftelse/:reservationNum',
        element: <BookingConfirmation />,
      },
    ],
  },
]);

export default router;
