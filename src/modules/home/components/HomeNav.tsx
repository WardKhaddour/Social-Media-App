import { useSelector } from 'react-redux';
import './HomeNav.scss';
import NavItem from './NavItem';
import { RootState } from 'store';
import { useTranslation } from 'react-i18next';

const HomeNav = ({ className }: { className: string }) => {
  const { t } = useTranslation();

  const { categories } = useSelector((state: RootState) => state.home);

  return (
    <nav className={className}>
      <ul className="home__nav--list">
        <NavItem name={t('label.recommendedUsers')} notCategory />
        <NavItem name={t('label.allCategories')} notCategory />

        {categories.map(category => (
          <NavItem key={category._id} name={category.name} />
        ))}
      </ul>
    </nav>
  );
};

export default HomeNav;
