// import { Button } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import TestCard from './components/movieCard/TestCard';
import Rubrik from './components/rubrik/Rubrik';
import Hall from './components/hall/Hall';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Rubrik title="Dagens Filmer" />
        <TestCard />
        <Hall seatRows={[8, 9, 10, 10, 10, 10, 12, 12]} />
      </main>
      <Outlet />
      <div>Footer</div>
    </div>
  );
}

export default App;
