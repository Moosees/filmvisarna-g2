import { Link } from 'react-router-dom';
import LogoText from '../../assets/images/logoText.svg';
import User from '../../assets/images/user.svg';
import NavButton from './NavButton';

function Header() {
  return (
    <header className="navbar">
      <nav className="container-fluid container-md">
        <Link to="/">
          <img
            src={LogoText}
            alt="Filmvisarna logo"
            className="img-fluid"
            style={{ minHeight: 'max(6vw, 35px)' }}
          />
        </Link>
        <NavButton to="/filmer" label="Kalender" />
        <NavButton to="/filmer" label="Upptäck" />
        <NavButton to="/evenemang" label="Evenameng" />
        <Link to="/">
          <img
            src={User}
            alt=""
            className="img-fluid"
            style={{ minHeight: 'max(6vw, 35px)' }}
          />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
