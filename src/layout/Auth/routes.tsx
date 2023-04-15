import { createBrowserRouter } from 'react-router-dom';
import AuthModuleLayout from 'modules/auth/ModuleLayout';
import AuthModuleRoutes from 'modules/auth/routes';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <AuthModuleLayout />,
    children: AuthModuleRoutes,
  },
]);

export default router;
