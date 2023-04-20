import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Home />,
    index: true,
  },
  {
    path: 'post/:postId',
    element: <PostDetails />,
  },
];

export default routes;
