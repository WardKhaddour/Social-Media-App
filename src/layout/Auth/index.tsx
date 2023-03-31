import { useRoutes, Navigate } from 'react-router-dom';
import routes from 'modules/auth/routes';
import logo from 'assets/img/logo.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './index.scss';

const AuthModuleLayout = () => {
  const element = useRoutes(routes);
  const { user } = useSelector((state: RootState) => state.user);

  if (user.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <section className="auth-layout">
      <div className="auth-layout__logo">
        <img src={logo} className="App-logo" alt="logo" />{' '}
      </div>
      <div className="auth-layout__content auth-content">{element}</div>
    </section>
  );
};

export default AuthModuleLayout;
