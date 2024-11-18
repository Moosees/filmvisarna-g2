import { Outlet, UIMatch, useMatches } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MainHeading from './components/mainHeading/MainHeading';
import usePageTitle from './hooks/usePageTitle';

interface AppMatch extends UIMatch {
  handle: {
    title?: string;
  };
}

function App() {
  const matches = useMatches() as unknown[] as AppMatch[];
  const titles = matches.filter(({ handle }) => handle?.title);
  const title =
    titles.length > 0 && typeof titles[0].handle.title === 'string'
      ? titles[0].handle.title
      : undefined;
  usePageTitle(title);

  return (
    <>
      <div className="min-vh-100 d-flex flex-column gap-3">
        <Header />
        <main className="flex-grow-1 container-lg d-flex flex-column gap-3">
          {title && <MainHeading title={titles[0].handle.title!} />}
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* React Toastify Container */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
