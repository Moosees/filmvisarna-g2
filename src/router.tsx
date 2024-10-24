import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RegisterPage from './pages/registerpage/RegisterPage';
import HomePage from './pages/homepage/HomePage';
import MovieDetailsPage from './pages/movieDetails/MovieDetailsPage';
import LoginPage from './pages/loginpage/LoginPage';

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
    ],
  },
]);

export default router;
