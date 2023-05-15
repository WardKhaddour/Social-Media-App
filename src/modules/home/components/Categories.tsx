import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import './Categories.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useTranslation } from 'react-i18next';

const Categories = ({ className }: { className: string }) => {
  const { t } = useTranslation();

  const { categories } = useSelector(
    (state: RootState) => state.home.homeLayout
  );

  return (
    <>
      <h2 className={`${className}__header`}>{t('label.categories')}</h2>

      <ul className={className}>
        {categories.slice(0, 3).map(category => (
          <CategoryItem key={category._id} name={category.name} />
        ))}
      </ul>
      <Link className={`${className}__link`} to="all-categories">
        {t('action.seeAll')}
      </Link>
    </>
  );
};

export default Categories;
