import LoadingSpinner from 'components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import homeRoutes from './routes';
import MostPopularUsers from './components/MostPopularUsers';
import Categories from './components/Categories';
import './ModuleLayout.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { getAllCategories, mostPopularUsers } from './store/actions';

const ModuleLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const elements = useRoutes(homeRoutes);

  useEffect(() => {
    Promise.all([
      dispatch(mostPopularUsers()),
      dispatch(getAllCategories()),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner loading={isLoading} />;
  return (
    <div className="home">
      <section className="home__content--secondary">
        <MostPopularUsers className="most-popular-users" />
        <Categories className="categories" />
      </section>
      <section className="home__content">{elements}</section>
    </div>
  );
};

export default ModuleLayout;
