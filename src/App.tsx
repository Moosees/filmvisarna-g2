import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 container">
        <Outlet />
      </main>
      <div
        style={{
          height: '15vh',
          backgroundColor: 'rgb(0 0 0 / 0.2)',
          marginTop: '2rem',
        }}
      >
        <Footer />
      </div>
    </div>
  );
}

export default App;
