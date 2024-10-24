import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoText from '../../assets/images/logoText.svg';
import User from '../../assets/images/user.svg';
import NavButton from './NavButton';

function Header() {
  return (
    <header className="navbar">
      <nav className="px-0 container-fluid container-md">
        <Link to="/">
          <img src={LogoText} alt="Filmvisarna logo" className="img-fluid" />
        </Link>
        <NavButton to="/filmer" label="Kalender" />
        <NavButton to="/filmer" label="Upptäck" />
        <NavButton to="/evenemang" label="Evenameng" />
        <Dropdown>
          <Dropdown.Toggle bsPrefix="custom-toggle" id="medlem">
            <img src={User} alt="Medlem meny" className="img-fluid" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu shadow">
            <Dropdown.Item as="button">
              <Link to="/medlem">Logga in</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/medlem/bli-medlem">Bli medlem</Link>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <Link to="/medlem">Logga ut</Link>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <Link to="/medlem">Medlemssida</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </header>
  );
}

export default Header;
