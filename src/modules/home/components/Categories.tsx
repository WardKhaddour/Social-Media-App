import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import './Categories.scss';

const Categories = ({ className }: { className: string }) => {
  const categories = [
    {
      name: 'IT',
      id: '12442',
    },
  ];
  return (
    <>
      <h2 className={`${className}__header`}>Categories</h2>

      <ul className={className}>
        {categories.map(category => (
          <NavItem key={category.id} name={category.name} />
        ))}
      </ul>
      <Link className={`${className}__link`} to="all-categories">
        See All
      </Link>
    </>
  );
};

export default Categories;
