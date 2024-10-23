import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RegisterPage from './pages/registerpage/RegisterPage';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';

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
        path: '/medlem/bli-medlem',
        element: <RegisterPage />,
      },
      {
        path: '/medlem/logga-in',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
