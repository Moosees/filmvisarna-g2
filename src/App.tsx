import { Outlet, UIMatch, useMatches } from 'react-router-dom';
import Header from './components/header/Header';
import MainHeading from './components/mainHeading/MainHeading';
import Biljettväljarkomponent from './components/Biljettväljare';

interface AppMatch extends UIMatch {
  handle: {
    title?: string;
  };
}

function App() {
  const matches = useMatches() as unknown[] as AppMatch[];
  const titles = matches.filter(({ handle }) => handle?.title);

  return (
    <div className="min-vh-100 d-flex flex-column gap-3">
      <Header />
      {titles.length > 0 && titles[0].handle.title && (
        <MainHeading title={titles[0].handle.title} />
      )}
      <main className="flex-grow-1 container">
        <Outlet />
      </main>
      <Biljettväljarkomponent/>
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
