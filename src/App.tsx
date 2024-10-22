import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import RegisterPage from './pages/registerpage/RegisterPage';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <RegisterPage />
      </main>

      <Outlet />
      <div>Footer</div>
    </div>
  );
}

export default App;
