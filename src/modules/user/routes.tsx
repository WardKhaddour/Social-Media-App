import { RouteObject } from 'react-router-dom';
import Settings from './pages/Settings';
import RestrictAuthenticated from '../../middlewares/RestrictAuthenticated';

const routes: RouteObject[] = [
  {
    path: '/settings',
    element: (
      <RestrictAuthenticated>
        <Settings />
      </RestrictAuthenticated>
    ),
  },
];

export default routes;
