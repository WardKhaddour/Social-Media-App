import { RouteObject } from 'react-router-dom';
import UserModuleLayout from 'modules/user/ModuleLayout';
import UserModuleRoutes from 'modules/user/routes';
import HomeModuleLayout from 'modules/home/ModuleLayout';
import HomeModuleRoutes from 'modules/home/routes';

import RestrictAuthenticated from '../../middlewares/RestrictAuthenticated';

const routes: RouteObject[] = [
  {
    path: '/*',
    element: (
      <RestrictAuthenticated>
        <UserModuleLayout />
      </RestrictAuthenticated>
    ),
    children: UserModuleRoutes,
  },
  {
    path: '/*',
    element: <HomeModuleLayout />,
    children: HomeModuleRoutes,
  },
];

export default routes;
