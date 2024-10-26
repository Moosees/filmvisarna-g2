import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoText from '../../assets/images/logoText.svg';
import User from '../../assets/images/user.svg';
import NavButton from '../buttons/NavButton';
import LogOut from './Logout';

function Header() {
  //check if user is logged in
  const isLoggedIn = sessionStorage.getItem('user') !== null;

  return (
    <header className="navbar">
      <nav className="px-0 container-fluid container-md">
        <Link to="/">
          <img src={LogoText} alt="Filmvisarna logo" className="img-fluid" />
        </Link>
        <NavButton to="/filmer" label="Kalender" />
        <NavButton to="/visning/3" label="Upptäck" />
        <NavButton to="/evenemang" label="Evenemang" />
        <Dropdown>
          <Dropdown.Toggle bsPrefix="custom-toggle" id="medlem">
            <img src={User} alt="Medlem meny" className="img-fluid" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu shadow">
            {!isLoggedIn && ( // Render these items only when not logged in
              <>
                <Dropdown.Item as="button">
                  <Link to="/medlem/logga-in">Logga in</Link>
                </Dropdown.Item>
                <Dropdown.Item as="button">
                  <Link to="/medlem/bli-medlem">Bli medlem</Link>
                </Dropdown.Item>
              </>
            )}
            {isLoggedIn && ( // Render these items only when logged in
              <>
                <Dropdown.Item as="button">
                  <Link to="/medlem">Medlemssida</Link>
                </Dropdown.Item>
                <Dropdown.Item as="button">
                  <LogOut />
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </header>
  );
}

export default Header;
