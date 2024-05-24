import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PropertyServices } from './property.service';
import { Request, Response } from 'express';
import { IAuthUser } from '../../interfaces/common';

const createLostProperty = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    // console.log('User Data', user);

    const result = await PropertyServices.createLostProperty(
      req,
      user as IAuthUser
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Lost property Submited Successfully ',
      data: result,
    });
  }
);
const createFoundProperty = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PropertyServices.createFoundProperty(
      req,
      user as IAuthUser
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Found property Submited Successfully !',
      data: result,
    });
  }
);

const claimProperty = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PropertyServices.claimProperty(req, user as IAuthUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Claim Process Successfully !',
      data: result,
    });
  }
);
const myClaimItem = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PropertyServices.myClaimItem(user as IAuthUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Claim Retrived Successfully !',
      data: result,
    });
  }
);
const myLostItem = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PropertyServices.myLostItem(user as IAuthUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Lost items Retrived Successfully !',
      data: result,
    });
  }
);
const myFoundItem = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PropertyServices.myFoundItem(user as IAuthUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Found items Retrived Successfully !',
      data: result,
    });
  }
);

export const PropertyControllers = {
  createLostProperty,
  createFoundProperty,
  claimProperty,
  myClaimItem,
  myLostItem,
  myFoundItem,
};
