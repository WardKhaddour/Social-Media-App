import { useRoutes } from 'react-router-dom';
import routes from './routes';
import logo from 'assets/img/logo.gif';

import './index.scss';

const AuthModuleLayout = () => {
  const element = useRoutes(routes);

  return (
    <section className="auth-layout">
      <div className="auth-layout__logo">
        <img src={logo} className="auth-layout__logo--img" alt="logo" />{' '}
      </div>
      <div className="auth-layout__content auth-content">{element}</div>
    </section>
  );
};

export default AuthModuleLayout;
