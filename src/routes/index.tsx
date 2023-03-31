import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../modules/NotFound';
import AuthModuleLayout from '../layout/Auth';
import AuthModuleRoutes from '../modules/auth/routes';
import HomeModuleLayout from '../layout/Home';

const router = createBrowserRouter([
  {
    path: '/auth/*',
    element: <AuthModuleLayout />,
    errorElement: <NotFound />,
    children: AuthModuleRoutes,
  },
  {
    path: '/*',
    element: <HomeModuleLayout />,
  },
]);

export default router;
