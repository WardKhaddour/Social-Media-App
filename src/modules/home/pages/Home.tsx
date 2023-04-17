import Post from '../components/Post';
import './Home.scss';

const Home = () => {
  return (
    <section className="home__posts">
      <Post
        title="Protected routes with react"
        content="How to create protected routes with react and react router v6 "
        author="Ward Khaddour"
        publishedAt={new Date(2023, 1, 14, 4, 20)}
      />
      <Post
        title="Protected routes with react"
        content="How to create protected routes with react and react router v6 "
        author="Ward Khaddour"
        publishedAt={new Date(2023, 1, 14, 4, 20)}
      />
    </section>
  );
};

export default Home;
