import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RegisterPage from './pages/registerpage/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/registrera',
    element: <RegisterPage />,
  },
]);

export default router;
