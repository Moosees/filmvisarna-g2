import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import RegisterPage from './pages/registerpage/RegisterPage';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column gap-5">
      <Header />
      <main className="flex-grow-1">
        <RegisterPage />
      </main>
      <div
        style={{
          height: '15vh',
          backgroundColor: 'rgb(0 0 0 / 0.2)',
          marginTop: '2rem',
        }}
      >
        Footer
      </div>
    </div>
  );
}

export default App;
