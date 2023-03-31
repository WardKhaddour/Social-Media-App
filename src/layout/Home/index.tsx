import { useRoutes } from 'react-router-dom';
import routes from 'modules/home/routes';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './index.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { homeLayoutActions } from './store';

const HomeModuleLayout = () => {
  const element = useRoutes(routes);
  const dispatch = useDispatch<AppDispatch>();

  const hideUserOptions = () => {
    dispatch(homeLayoutActions.hideOptions());
  };

  return (
    <>
      <Header onClick={hideUserOptions} />
      <main onClick={hideUserOptions} className="home-layout">
        <Sidebar />
        <div className="content">{element}</div>
      </main>
    </>
  );
};

export default HomeModuleLayout;
