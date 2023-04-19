import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import './Categories.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const Categories = ({ className }: { className: string }) => {
  const { categories } = useSelector((state: RootState) => state.home);

  return (
    <>
      <h2 className={`${className}__header`}>Categories</h2>

      <ul className={className}>
        {categories.map(category => (
          <NavItem key={category._id} name={category.name} />
        ))}
      </ul>
      <Link className={`${className}__link`} to="all-categories">
        See All
      </Link>
    </>
  );
};

export default Categories;
