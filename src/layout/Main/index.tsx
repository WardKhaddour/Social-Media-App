import { useRoutes } from 'react-router-dom';
import routes from './routes';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './index.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { mainLayoutActions } from './store';

const MainModuleLayout = () => {
  const element = useRoutes(routes);
  const dispatch = useDispatch<AppDispatch>();

  const hideUserOptions = () => {
    dispatch(mainLayoutActions.hideOptions());
  };

  return (
    <>
      <Header onClick={hideUserOptions} />
      <main onClick={hideUserOptions} className="main-layout">
        <Sidebar />
        <div className="content">{element}</div>
      </main>
    </>
  );
};

export default MainModuleLayout;
