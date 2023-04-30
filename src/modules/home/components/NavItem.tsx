import './NavItem.scss';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const NavItem = ({ name, to }: { name: string; to?: string }) => {
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
        <Link to={to} className="nav__item" onClick={handlePostsByCategory}>
          {name}
        </Link>
      )}
      {!to && (
        <li className="nav__item" onClick={handlePostsByCategory}>
          {name}
        </li>
      )}
    </>
  );
};

export default NavItem;
