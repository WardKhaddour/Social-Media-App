import { RouteObject } from 'react-router-dom';
import Home from './pages/Posts';
import PostDetails from './pages/PostDetails';
import UserProfile from './pages/UserProfile';
import Me from './pages/UserProfile/Me';
import SavedItems from './pages/SavedItems';
import AllUsers from './pages/AllUsers';
import AllCategories from './pages/AllCategories';

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
    path: 'all-categories',
    element: <AllCategories />,
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
