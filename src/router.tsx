import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RegisterPage from './pages/registerpage/RegisterPage';
import HomePage from './pages/homepage/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/registrera',
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
