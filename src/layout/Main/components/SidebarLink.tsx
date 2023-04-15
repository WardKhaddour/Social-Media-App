import { FC } from 'react';
import { Link } from 'react-router-dom';

interface SideBarLinkProps {
  label: string;
  icon: FC;
  toPage: string;
}

const SideBarLink = (props: SideBarLinkProps) => {
  return (
    <Link className="sidebar__list-item" to={props.toPage}>
      <span className="sidebar__list-item--label">{props.label}</span>
      <span className="sidebar__list-item--icon">
        <props.icon />
      </span>
    </Link>
  );
};

export default SideBarLink;
