import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

import './Home.scss';
import AddPost from '../components/AddPost';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../store/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import FilterPosts from '../components/FilterPosts';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const {
    posts,
    postsPagination,
    isLoading: postsIsLoading,
  } = useSelector((state: RootState) => state.home);

  const page = +postsPagination.page;
  const totalPages = +postsPagination.totalPages;

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );

  const [search] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(postsIsLoading);

  useEffect(() => {
    const searchObj = Object.fromEntries(new URLSearchParams(search));
    dispatch(getAllPosts(searchObj)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, search]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;

  return (
    <>
      {isAuthenticated && <AddPost />}
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
