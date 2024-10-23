import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import BookingConfirmation from './pages/bookingConfirmation/bookingConfirmation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/boknings-bekräftelse/:reservationNum',
    element: <BookingConfirmation />,
  },
]);

export default router;
