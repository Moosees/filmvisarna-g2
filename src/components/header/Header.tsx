import { useSuspenseQuery } from '@tanstack/react-query';
import { MouseEventHandler } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLogOutMutation } from '../../api/logOut';
import { getRootDataQuery } from '../../api/root';
import LogoText from '../../assets/images/logoText.svg';
import User from '../../assets/images/user.svg';
import NavButton from '../buttons/NavButton';

function Header() {
  const {
    data: { isLoggedIn },
  } = useSuspenseQuery(getRootDataQuery());

  const { mutate: logOut } = useLogOutMutation();

  const handleLogOut: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    logOut();
  };

  return (
    <header className="navbar">
      <nav className="container-sm">
        <Link to="/">
          <img src={LogoText} alt="Filmvisarna logo" className="img-fluid" />
        </Link>
        <NavButton to="/filmer" label="Kalender" />
        {/* <NavButton to="/filmer?alder=7" label="Upptäck" /> */}
        <NavButton to="/evenemang" label="Evenemang" />
        <Dropdown>
          <Dropdown.Toggle bsPrefix="custom-toggle" id="medlem">
            <img src={User} alt="Medlem meny" className="img-fluid scale" />
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
                  <Link to="/medlem/medlems-sida">Medlemssida</Link>
                </Dropdown.Item>
                <Dropdown.Item as="button">
                  <a href="#" onClick={handleLogOut}>
                    Logga ut
                  </a>
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
