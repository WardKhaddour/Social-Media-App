import Post from '../components/Post';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './Home.scss';

const Home = () => {
  const { posts } = useSelector((state: RootState) => state.home);

  return (
    <section className="home__posts">
      {posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </section>
  );
};

export default Home;
