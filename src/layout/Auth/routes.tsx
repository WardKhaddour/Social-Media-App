import { RouteObject } from 'react-router-dom';
import AuthModuleLayout from 'modules/auth/ModuleLayout';
import AuthModuleRoutes from 'modules/auth/routes';

const router: RouteObject[] = [
  {
    path: '/*',
    element: <AuthModuleLayout />,
    children: AuthModuleRoutes,
  },
];

export default router;
