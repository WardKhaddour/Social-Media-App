import { RouteObject } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

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
];

export default routes;
