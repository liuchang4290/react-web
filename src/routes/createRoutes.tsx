import { type RouteObject } from 'react-router';

import Home from '../pages/Home';

const createRoutes = (): RouteObject[] => {
  return [
    {
      path: '/',
      element: (
          <Home />
      ),
    }
  ];
};

export default createRoutes;
