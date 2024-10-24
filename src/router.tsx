import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RegisterPage from './pages/registerpage/RegisterPage';
import HomePage from './pages/homepage/HomePage';
import MovieDetailsPage from './pages/movieDetails/MovieDetailsPage';

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
      {
        path: '/film/:id',
        element: <MovieDetailsPage />,
      },
    ],
  },
]);

export default router;
