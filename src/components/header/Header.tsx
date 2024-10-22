import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import User from '../../assets/images/user.svg';

function Header() {
  return (
    <header className="container">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Filmvisarna logo" />
        </Link>
        <Link to="/filmer" className="navbar-text">
          Kalender
        </Link>
        <Link to="/filmer" className="navbar-text">
          Upptäck
        </Link>
        <Link to="/evenemang" className="navbar-text">
          Evenameng
        </Link>
        <Link to="/">
          <img src={User} alt="" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
