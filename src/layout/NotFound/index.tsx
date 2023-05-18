import { useNavigate } from 'react-router-dom';
import './index.scss';
import logo from 'assets/img/logo.gif';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <div className="not-found__logo">
        <img src={logo} crossOrigin="anonymous" alt="Topic Nexus logo"></img>
      </div>
      <h2 className="not-found__title heading-primary">Oops !!</h2>
      <p className="not-found__content">Page Not Found !!</p>
      <button onClick={goHome} className="btn btn-primary" type="button">
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
