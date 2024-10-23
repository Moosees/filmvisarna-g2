import { createBrowserRouter } from 'react-router-dom';
import { reserveLoader } from './api/reserve';
import App from './App';
import HomePage from './pages/homepage/HomePage';
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
        path: '/registrera',
        element: <RegisterPage />,
        handle: {
          title: 'Bli medlem',
        },
      },
      {
        path: '/visning/:screeningId',
        element: <ReservePage />,
        handle: {
          title: 'Boka platser',
        },
        loader: reserveLoader,
      },
    ],
  },
]);

export default router;
