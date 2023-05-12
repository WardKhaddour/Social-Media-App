import AuthModuleLayout from 'layout/Auth';
import MainModuleLayout from 'layout/Main';
import RestrictUnAuthenticated from 'middlewares/RestrictUnauthenticated';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/auth/*',
    element: (
      <RestrictUnAuthenticated>
        <AuthModuleLayout />
      </RestrictUnAuthenticated>
    ),
  },
  {
    path: '/*',
    element: <MainModuleLayout />,
  },
]);

export default router;
