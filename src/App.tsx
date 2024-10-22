// import { Button } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import TestCard from './components/movieCard/TestCard';
import Rubrik from './components/rubrik/Rubrik';
import StoraSalong from './components/hall/StoraSalong';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Rubrik title="Dagens Filmer" />
        <TestCard />
        <StoraSalong />
      </main>
      <Outlet />
      <div>Footer</div>
    </div>
  );
}

export default App;
