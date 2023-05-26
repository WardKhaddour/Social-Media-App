import { RouteObject } from 'react-router-dom';
import Home from './pages/Posts';
import React from 'react';

const PostDetails = React.lazy(() => import('./pages/PostDetails'));
const UserProfile = React.lazy(() => import('./pages/UserProfile'));
const Me = React.lazy(() => import('./pages/UserProfile/Me'));
const SavedItems = React.lazy(() => import('./pages/SavedItems'));
const AllUsers = React.lazy(() => import('./pages/AllUsers'));
const AllCategories = React.lazy(() => import('./pages/AllCategories'));

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
