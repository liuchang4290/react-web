import { createBrowserRouter } from 'react-router';

import createRoutes from './createRoutes.tsx';

const router = createBrowserRouter(createRoutes());

export default router;
