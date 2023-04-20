import LoadingSpinner from 'components/LoadingSpinner';
import {
  getAllCategories,
  getAllPosts,
  mostPopularUsers,
} from './store/actions';
import { useEffect, useState } from 'react';

import { useRoutes } from 'react-router-dom';
import homeRoutes from './routes';
import MostPopularUsers from './components/MostPopularUsers';
import HomeNav from './components/HomeNav';
import Categories from './components/Categories';
import './ModuleLayout.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';

const ModuleLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const elements = useRoutes(homeRoutes);

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
    <div className="home">
      <HomeNav className="home__nav" />
      <section className="home__content--secondary">
        <MostPopularUsers className="most-popular-users" />
        <Categories className="categories" />
      </section>
      <section className="home__content">{elements}</section>
    </div>
  );
};

export default ModuleLayout;
