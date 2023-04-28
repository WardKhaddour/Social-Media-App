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
// import { URLSearchParams } from 'url';

const Home = () => {
  const { posts } = useSelector((state: RootState) => state.home);
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );

  const [search] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

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
      <section className="home__posts">
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </section>
    </>
  );
};

export default Home;
