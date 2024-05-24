import express, { NextFunction, Request, Response } from 'express';
import { PropertyControllers } from './property.controller';

import { PropertyValidation } from './property.validation';
import { fileUploader } from '../../../shared/fileUploader';
import auth from '../../middlewares/auth';
import { userRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/create-lostproperty',
  auth(userRole.USER, userRole.ADMIN),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PropertyValidation.lostItemValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    next();
  },
  PropertyControllers.createLostProperty
);

router.post(
  '/create-foundproperty',
  auth(userRole.USER, userRole.ADMIN),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PropertyValidation.foundItemValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    next();
  },
  PropertyControllers.createFoundProperty
);

router.post(
  '/claim',
  auth(userRole.USER, userRole.ADMIN),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PropertyValidation.claimValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    next();
  },
  PropertyControllers.claimProperty
);

router.get(
  '/my-claim-items',
  auth(userRole.ADMIN, userRole.USER, userRole.SUPPER_ADMIN),
  PropertyControllers.myClaimItem
);

router.get(
  '/my-lost-items',
  auth(userRole.ADMIN, userRole.USER, userRole.SUPPER_ADMIN),
  PropertyControllers.myLostItem
);

router.get(
  '/my-found-items',
  auth(userRole.ADMIN, userRole.USER, userRole.SUPPER_ADMIN),
  PropertyControllers.myFoundItem
);

export const propertyRouter = router;
