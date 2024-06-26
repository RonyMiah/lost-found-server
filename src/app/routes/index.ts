import express from 'express';

import { userRouter } from '../Modules/User/user.route';
import { AuthRoutes } from '../Modules/Auth/auth.route';
import { propertyRouter } from '../Modules/Property/property.route';
import { MetaRoutes } from '../Modules/Meta/meta.routes';

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
  {
    path: '/property',
    route: propertyRouter,
  },
  {
    path: '/meta',
    route: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
