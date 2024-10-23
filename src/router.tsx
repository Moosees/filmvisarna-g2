import { createBrowserRouter } from 'react-router-dom';
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
        path: '/visning',
        element: <ReservePage />,
        handle: {
          title: 'Boka platser',
        },
      },
    ],
  },
]);

export default router;
