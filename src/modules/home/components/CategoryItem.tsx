import './CategoryItem.scss';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const CategoryItem = ({ name, to }: { name: string; to?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearch] = useSearchParams();
  const handlePostsByCategory = () => {
    if (location.pathname === '/') {
      setSearch(prev => {
        prev.set('category', name);
        return prev;
      });
    } else {
      navigate(`/?category=${name}`, {});
    }
  };
  return (
    <>
      {!!to && (
        <Link
          to={to}
          className="category__item"
          onClick={handlePostsByCategory}
        >
          {name}
        </Link>
      )}
      {!to && (
        <li className="category__item" onClick={handlePostsByCategory}>
          {name}
        </li>
      )}
    </>
  );
};

export default CategoryItem;
