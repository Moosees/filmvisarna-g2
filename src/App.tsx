import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 container">
        <Outlet />
      </main>
      <div>Footer</div>
    </div>
  );
}

export default App;
