import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'store';

const RestrictUnAuthenticated = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return props.children;
};

export default RestrictUnAuthenticated;
