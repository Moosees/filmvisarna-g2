import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import User from '../../assets/images/user.svg';
import NavButton from './NavButton';

function Header() {
  return (
    <header className="container">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Filmvisarna logo" />
        </Link>
        <NavButton to="/filmer" label="Kalender" />
        <NavButton to="/filmer" label="Upptäck" />
        <NavButton to="/evenemang" label="Evenameng" />
        <Link to="/">
          <img src={User} alt="" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
