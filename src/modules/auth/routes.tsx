import { RouteObject } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const routes: RouteObject[] = [
  {
    path: '',
    element: <Login />,
    index: true,
  },
  {
    path: 'signup',
    element: <Signup />,
  },

  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
];

export default routes;
