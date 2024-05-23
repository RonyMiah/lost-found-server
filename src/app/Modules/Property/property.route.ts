import express, { NextFunction, Request, Response } from 'express';
import { PropertyControllers } from './property.controller';

import { PropertyValidation } from './property.validation';
import { fileUploader } from '../../../shared/fileUploader';

const router = express.Router();

router.post(
  '/create-lostproperty',
  //   auth(userRole.ADMIN, userRole.SUPPER_ADMIN),
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
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PropertyValidation.claimValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    next();
  },
  PropertyControllers.claimProperty
);

export const propertyRouter = router;
