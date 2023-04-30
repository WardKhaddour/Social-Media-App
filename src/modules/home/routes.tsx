import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import UserProfile from './pages/UserProfile';
import Me from './pages/Me';
import SavedItems from './pages/SavedItems';
import AllUsers from './pages/AllUsers';

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
    path: 'all-users',
    element: <AllUsers />,
  },
  {
    path: 'me',
    element: <Me />,
  },
  {
    path: 'saved',
    element: <SavedItems />,
  },
];

export default routes;
