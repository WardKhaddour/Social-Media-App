import { RouteObject } from 'react-router-dom';
import Settings from '../user/pages/Settings';
import RestrictAuthenticated from '../../middlewares/RestrinctAuthenticated';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>Hello</div>,
    index: true,
  },
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
