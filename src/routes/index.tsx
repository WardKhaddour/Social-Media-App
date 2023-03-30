import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../modules/NotFound';
import AuthModuleLayout from '../layout/Auth';
import AuthModuleRoutes from '../modules/auth/routes';
import HomeModuleLayout from '../layout/Home';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <AuthModuleLayout />,
    errorElement: <NotFound />,
    children: AuthModuleRoutes,
  },
  {
    path: '/home/*',
    element: <HomeModuleLayout />,
  },
]);

export default router;
