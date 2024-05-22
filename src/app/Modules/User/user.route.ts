import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validationRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserSchemaValidation),
  UserControllers.createUser
);

export const userRouter = router;
