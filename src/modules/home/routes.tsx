import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import UserProfile from './pages/UserProfile';
import Me from './pages/Me';

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
  {
    path: 'user/:userId',
    element: <UserProfile />,
  },
  {
    path: 'me',
    element: <Me />,
  },
];

export default routes;
