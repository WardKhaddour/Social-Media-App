import { useRoutes } from 'react-router-dom';
import homeRoutes from './routes';
import MostPopularUsers from './components/MostPopularUsers';
import HomeNav from './components/HomeNav';
import Categories from './components/Categories';
import './ModuleLayout.scss';

const ModuleLayout = () => {
  const elements = useRoutes(homeRoutes);
  return (
    <div className="home">
      <HomeNav className="home__nav" />
      <section className="home__content--secondary">
        <MostPopularUsers className="most-popular-users" />
        <Categories className="categories" />
      </section>
      {elements}
    </div>
  );
};

export default ModuleLayout;
