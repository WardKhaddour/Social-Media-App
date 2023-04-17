import './HomeNav.scss';
import NavItem from './NavItem';

const HomeNav = ({ className }: { className: string }) => {
  return (
    <nav className={className}>
      <ul className="home__nav--list">
        <NavItem name="Most Popular" />
      </ul>
    </nav>
  );
};

export default HomeNav;
