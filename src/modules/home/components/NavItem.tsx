import './NavItem.scss';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const NavItem = ({
  name,
  notCategory,
}: {
  name: string;
  notCategory?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearch] = useSearchParams();
  const handlePostsByCategory = (event: any) => {
    const target = event.target as HTMLElement;
    if (target.dataset.category === 'no-category') {
      return;
    }

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
    <li
      className="nav__item"
      data-category={notCategory ? 'no-category' : ''}
      onClick={handlePostsByCategory}
    >
      {name}
    </li>
  );
};

export default NavItem;
