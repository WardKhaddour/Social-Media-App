import { RouteObject } from 'react-router-dom';
import Settings from './pages/Settings';

const routes: RouteObject[] = [
  {
    path: 'settings',
    element: <Settings />,
  },
];

export default routes;
