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
    // console.log(req.body);
    next();
  },
  PropertyControllers.createLostProperty
);

export const propertyRouter = router;
