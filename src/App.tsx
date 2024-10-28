import { Outlet, UIMatch, useMatches } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MainHeading from './components/mainHeading/MainHeading';

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
      <main className="flex-grow-1 container">
        {titles.length > 0 && titles[0].handle.title && (
          <MainHeading title={titles[0].handle.title} />
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
