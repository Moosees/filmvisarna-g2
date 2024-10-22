import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center">
      <Header />
      <main className="flex-grow-1">Main</main>
      <Outlet />
      <div>Footer</div>
    </div>
  );
}

export default App;
