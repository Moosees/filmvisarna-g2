// import { Button } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import TestCard from './components/MovieCards/TestCard';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">Main</main>
      <TestCard />
      <Outlet />
      <div>Footer</div>
    </div>
  );
}

export default App;
