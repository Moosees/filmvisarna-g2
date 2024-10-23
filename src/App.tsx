import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Rubrik from './components/rubrik/Rubrik';
// import Hall from './components/hall/Hall';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Rubrik title="Dagens Filmer" />
        <Outlet />
        {/* <Hall seatRows={[8, 9, 10, 10, 10, 10, 12, 12]} /> */}
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
