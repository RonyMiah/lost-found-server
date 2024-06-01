import express, { NextFunction, Request, Response } from 'express';
import { PropertyControllers } from './property.controller';

import { PropertyValidation } from './property.validation';
import { fileUploader } from '../../../shared/fileUploader';
import auth from '../../middlewares/auth';
import { userRole } from '@prisma/client';
import validateRequest from '../../middlewares/validationRequest';

const router = express.Router();

router.post(
  '/create-lostproperty',
  auth(userRole.USER, userRole.ADMIN),
  // fileUploader.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = PropertyValidation.lostItemValidationSchema.parse(
  //     JSON.parse(req.body.data)
  //   );
  //   next();
  // },
  validateRequest(PropertyValidation.lostItemValidationSchema),
  PropertyControllers.createLostProperty
);

router.post(
  '/create-foundproperty',
  auth(userRole.USER, userRole.ADMIN),
  // fileUploader.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = PropertyValidation.foundItemValidationSchema.parse(
  //     JSON.parse(req.body.data)
  //   );
  //   next();
  // },
  validateRequest(PropertyValidation.foundItemValidationSchema),
  PropertyControllers.createFoundProperty
);

router.post(
  '/claim',
  auth(userRole.USER, userRole.ADMIN),
  // fileUploader.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = PropertyValidation.claimValidationSchema.parse(
  //     JSON.parse(req.body.data)
  //   );
  //   next();
  // },
  validateRequest(PropertyValidation.claimValidationSchema),
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

router.get('/getall-lost-items', PropertyControllers.getAllLostItems);
router.get('/getall-found-items', PropertyControllers.getAllFoundItems);

//found items
router.patch(
  '/update-found-items/:id',
  validateRequest(PropertyValidation.updateFoundItemValidationSchema),
  PropertyControllers.updateFoundItems
);
router.delete('/update-found-items/:id', PropertyControllers.deleteFoundItems);

router.get(
  '/getsingle-found-items/:id',
  PropertyControllers.getSingleFoundItems
);
router.get('/claim-items/:id', PropertyControllers.getSingleClaimItems);

//lost items
router.patch(
  '/update-lost-items/:id',
  validateRequest(PropertyValidation.updateLostItemValidationSchema),
  PropertyControllers.updateLostItems
);
router.delete('/update-lost-items/:id', PropertyControllers.deleteLostItems);

router.get('/getsingle-lost-items/:id', PropertyControllers.getSingleLostItems);

export const propertyRouter = router;
