import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validationRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidation.createUserSchemaValidation),
  UserControllers.createUser
);
router.post(
  '/create-admin',
  validateRequest(userValidation.createUserSchemaValidation),
  UserControllers.createAdmin
);

export const userRouter = router;
