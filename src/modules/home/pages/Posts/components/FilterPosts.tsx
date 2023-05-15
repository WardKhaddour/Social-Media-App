import { useTranslation } from 'react-i18next';
import SortPosts from './SortPosts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { useSearchParams } from 'react-router-dom';
import { getAllPosts } from '../store/actions';

const FilterPosts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useSearchParams();

  const searchObj = Object.fromEntries(new URLSearchParams(search));

  const handleFilterByMostPopular = async () => {
    setSearch(prev => {
      prev.delete('category');
      return prev;
    });
    await dispatch(
      getAllPosts(searchObj, {
        mostPopular: true,
      })
    );
  };

  const handleFilterByFollowing = async () => {
    setSearch(prev => {
      prev.delete('category');
      return prev;
    });
    await dispatch(
      getAllPosts(searchObj, {
        byFollowing: true,
      })
    );
  };

  return (
    <div className="filter-posts">
      <SortPosts />
      <button
        className="filter-posts__button btn btn-secondary"
        type="button"
        onClick={handleFilterByMostPopular}
      >
        {t('label.mostPopular')}
      </button>
      <button
        className="filter-posts__button btn btn-secondary"
        type="button"
        onClick={handleFilterByFollowing}
      >
        {t('label.followingPosts')}
      </button>
    </div>
  );
};

export default FilterPosts;
