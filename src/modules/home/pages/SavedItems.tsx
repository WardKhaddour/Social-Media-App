import { useTranslation } from 'react-i18next';
import './SavedItems.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { useEffect, useState } from 'react';
import { getSavedPosts } from '../store/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import Post from '../components/Post';

const SavedItems = () => {
  const { t } = useTranslation();
  const { savedPosts: posts } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getSavedPosts()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div className="saved-items">
      <h2 className="heading-primary saved-items__heading">
        {t('label.saved')}
      </h2>
      <section className="saved-items__posts">
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </section>
    </div>
  );
};

export default SavedItems;
