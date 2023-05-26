import MainModuleLayout from 'layout/Main';
import NotFoundModuleLayout from 'layout/NotFound';
import RestrictUnAuthenticated from 'middlewares/RestrictUnauthenticated';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const AuthModuleLayout = React.lazy(() => import('layout/Auth'));

const router = createBrowserRouter([
  {
    path: '/auth/*',
    element: (
      <RestrictUnAuthenticated>
        <AuthModuleLayout />
      </RestrictUnAuthenticated>
    ),
    errorElement: <NotFoundModuleLayout />,
  },
  {
    path: '/*',
    element: <MainModuleLayout />,
    errorElement: <NotFoundModuleLayout />,
  },
  {
    path: '*',
    element: <NotFoundModuleLayout />,
  },
]);

export default router;
