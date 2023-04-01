import { RouteObject } from 'react-router-dom';
import Settings from '../user/pages/Settings';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>Hello</div>,
    index: true,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
];

export default routes;
