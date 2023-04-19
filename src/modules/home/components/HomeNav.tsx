import { useSelector } from 'react-redux';
import './HomeNav.scss';
import NavItem from './NavItem';
import { RootState } from 'store';

const HomeNav = ({ className }: { className: string }) => {
  const { categories } = useSelector((state: RootState) => state.home);
  return (
    <nav className={className}>
      <ul className="home__nav--list">
        <NavItem name="Most Popular" />
        <NavItem name="Recommended Users" />
        <NavItem name="All Categories" />

        {categories.map(category => (
          <NavItem key={category._id} name={category.name} />
        ))}
      </ul>
    </nav>
  );
};

export default HomeNav;
