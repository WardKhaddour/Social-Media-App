import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import './Categories.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useTranslation } from 'react-i18next';

const Categories = ({ className }: { className: string }) => {
  const { t } = useTranslation();

  const { categories } = useSelector((state: RootState) => state.home);

  return (
    <>
      <h2 className={`${className}__header`}>{t('label.categories')}</h2>

      <ul className={className}>
        {categories.map(category => (
          <NavItem key={category._id} name={category.name} />
        ))}
      </ul>
      <Link className={`${className}__link`} to="all-categories">
        {t('action.seeAll')}
      </Link>
    </>
  );
};

export default Categories;
