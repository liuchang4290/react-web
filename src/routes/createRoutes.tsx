import { type RouteObject } from 'react-router';

import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import LoginCode from '../pages/Login/code';

const createRoutes = (): RouteObject[] => {
  return [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/user/login/code',
      element: <LoginCode />,
    },
  ];
};

export default createRoutes;
