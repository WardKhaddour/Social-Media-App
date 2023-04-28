import { useTranslation } from 'react-i18next';
import SortPosts from './SortPosts';

const FilterPosts = () => {
  const { t } = useTranslation();

  return (
    <div className="filter-posts">
      <SortPosts />
      <button className="filter-posts__button btn btn-secondary" type="button">
        {t('label.mostPopular')}
      </button>
      <button className="filter-posts__button btn btn-secondary" type="button">
        {t('label.followingPosts')}
      </button>
    </div>
  );
};

export default FilterPosts;
