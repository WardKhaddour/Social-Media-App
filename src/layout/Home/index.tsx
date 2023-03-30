import { Navigate, useRoutes } from 'react-router-dom';
import routes from '../../modules/home/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const HomeModuleLayout = () => {
  const element = useRoutes(routes);
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <section className="home-layout">
      <div className="home-layout__content home-content">{element}</div>
    </section>
  );
};

export default HomeModuleLayout;
