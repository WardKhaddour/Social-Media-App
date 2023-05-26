import { RouteObject } from 'react-router-dom';
import UserModuleRoutes from 'modules/user/routes';
import HomeModuleLayout from 'modules/home/ModuleLayout';
import HomeModuleRoutes from 'modules/home/routes';

import RestrictAuthenticated from '../../middlewares/RestrictAuthenticated';
import React from 'react';

const UserModuleLayout = React.lazy(() => import('modules/user/ModuleLayout'));

const routes: RouteObject[] = [
  {
    path: '/*',
    element: <HomeModuleLayout />,
    children: HomeModuleRoutes,
  },
  {
    path: '/*',
    element: (
      <RestrictAuthenticated>
        <UserModuleLayout />
      </RestrictAuthenticated>
    ),
    children: UserModuleRoutes,
  },
];

export default routes;
