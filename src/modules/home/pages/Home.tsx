import Post from '../components/Post';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './Home.scss';
import AddPost from '../components/AddPost';

const Home = () => {
  const { posts } = useSelector((state: RootState) => state.home);

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );

  return (
    <>
      {isAuthenticated && <AddPost />}
      <hr />
      <section className="home__posts">
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </section>
    </>
  );
};

export default Home;
