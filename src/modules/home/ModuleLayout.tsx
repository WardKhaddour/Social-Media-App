import { useRoutes } from 'react-router-dom';
import homeRoutes from './routes';
import UsersToFollow from './components/UsersToFollow';
import HomeNav from './components/HomeNav';
import Categories from './components/Categories';
import './ModuleLayout.scss';

const ModuleLayout = () => {
  const elements = useRoutes(homeRoutes);
  return (
    <div className="home">
      <HomeNav className="home__nav" />
      <section className="home__content--secondary">
        <UsersToFollow className="users-to-follow" />
        <Categories className="categories" />
      </section>
      {elements}
    </div>
  );
};

export default ModuleLayout;
