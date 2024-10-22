import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import BookingConfirmation from './pages/bookingConfirmation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/booking-confirmation',
    element: <BookingConfirmation />,
  },
]);

export default router;
