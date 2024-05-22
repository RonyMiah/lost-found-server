import express from 'express';

import { userRouter } from '../Modules/User/user.route';
import { AuthRoutes } from '../Modules/Auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
