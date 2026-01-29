import React from 'react';

import MinimalLayout from '../../layout/minimal';
import Loadable from '../../shared/components/loadable';

const Home = Loadable(React.lazy(() => import('../../modules/home')));
const Auth = Loadable(React.lazy(() => import('../../modules/auth')));

const PublicRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'auth/*',
      element: <Auth />,
    },
  ],
};

export default PublicRoutes;
