import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../modules/NotFound';
import AuthModuleLayout from '../layout/Auth';
import AuthModuleRoutes from '../modules/auth/routes';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <AuthModuleLayout />,
    errorElement: <NotFound />,
    children: AuthModuleRoutes,
  },
]);

export default router;
