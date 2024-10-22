import { NavLink, type NavLinkProps } from 'react-router-dom';

function NavButton(props: { label: string } & NavLinkProps) {
  const { label, ...otherProps } = props;

  return (
    <NavLink {...otherProps} className="navbar-text">
      {label}
    </NavLink>
  );
}

export default NavButton;
