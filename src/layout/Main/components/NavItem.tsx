import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './NavItem.scss';

interface Props {
  icon: ReactNode;
  label: string;
  to: string;
}
const NavItem = (props: Props) => {
  return (
    <Link to={props.to} className="nav-item">
      <span className="nav-item__icon">{props.icon}</span>
      <span className="nav-item__label">{props.label}</span>
    </Link>
  );
};

export default NavItem;
