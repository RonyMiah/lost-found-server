import express from 'express';
import { MetaControllers } from './meta.controller';
import auth from '../../middlewares/auth';
import { userRole } from '@prisma/client';

const router = express.Router();

router.get(
  '/',
  auth(userRole.ADMIN, userRole.SUPPER_ADMIN),
  MetaControllers.fetchDatabaseMetadata
);

export const MetaRoutes = router;
