import Post from '../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

import './index.scss';
import EditPost from '../../components/EditPost';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllPosts } from './store/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import FilterPosts from './components/FilterPosts';
import Pagination from '../../components/Pagination';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const { posts, pagination, isLoading } = useSelector(
    (state: RootState) => state.home.posts
  );

  const page = +(pagination?.page || 1);
  const totalPages = +(pagination?.totalPages || 1);

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );

  const [search, setSearch] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const searchObj = Object.fromEntries(new URLSearchParams(search));

    setSearch(prev => {
      if (prev.get('sort')) {
        return prev;
      }
      prev.set('sort', '-publishedAt');
      return prev;
    });

    if (Object.keys(searchObj).length > 0 && searchObj.sort)
      dispatch(getAllPosts(searchObj));
  }, [dispatch, search, setSearch]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;
  return (
    <>
      {isAuthenticated && <EditPost />}
      <hr />
      <FilterPosts />
      <section className="home-posts">
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
        {!posts.length && <p className="no-posts">{t('msg.noPosts')}</p>}
        {!!posts.length && <Pagination page={page} totalPages={totalPages} />}
      </section>
    </>
  );
};

export default Home;
