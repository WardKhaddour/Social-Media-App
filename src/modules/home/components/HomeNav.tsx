import { useSelector } from 'react-redux';
import './HomeNav.scss';
import CategoryItem from './CategoryItem';
import { RootState } from 'store';
import { useTranslation } from 'react-i18next';

const HomeNav = ({ className }: { className: string }) => {
  const { t } = useTranslation();

  const { categories } = useSelector(
    (state: RootState) => state.home.homeLayout
  );

  return (
    <nav className={className}>
      <ul className="home__nav--list">
        <CategoryItem name={t('label.home')} to="/" />
        <CategoryItem name={t('label.recommendedUsers')} to="/all-users" />
        <CategoryItem name={t('label.allCategories')} to="/all-categories" />

        {categories.map(category => (
          <CategoryItem key={category._id} name={category.name} />
        ))}
      </ul>
    </nav>
  );
};

export default HomeNav;
