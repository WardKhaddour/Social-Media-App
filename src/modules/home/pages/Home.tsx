import LoadingSpinner from 'components/LoadingSpinner';
import Post from '../components/Post';
import {
  getAllCategories,
  getAllPosts,
  mostPopularUsers,
} from '../store/actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

import './Home.scss';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { posts } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    Promise.all([
      dispatch(getAllPosts()),
      dispatch(mostPopularUsers()),
      dispatch(getAllCategories()),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;
  return (
    <section className="home__posts">
      {posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </section>
  );
};

export default Home;
