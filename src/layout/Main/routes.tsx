import { RouteObject } from 'react-router-dom';
import UserModuleLayout from 'modules/user/ModuleLayout';
import UserModuleRoutes from 'modules/user/routes';
const routes: RouteObject[] = [
  {
    path: '/*',
    element: <UserModuleLayout />,
    children: UserModuleRoutes,
  },
];

export default routes;
