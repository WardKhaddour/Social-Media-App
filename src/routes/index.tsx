import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layout/Auth';
import MainLayout from '../layout/Main';
import RestrictUnAuthenticated from '../middlewares/RestrictUnauthenticated';

const router = createBrowserRouter([
  {
    path: '/auth/*',
    element: (
      <RestrictUnAuthenticated>
        <AuthLayout />
      </RestrictUnAuthenticated>
    ),
  },
  {
    path: '/*',
    element: <MainLayout />,
  },
]);

export default router;
