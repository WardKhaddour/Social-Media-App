import './NavItem.scss';

const NavItem = ({ name }: { name: string }) => {
  return <li className="nav__item">{name}</li>;
};

export default NavItem;
