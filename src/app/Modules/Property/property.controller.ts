import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PropertyServices } from './property.service';
import { Request, Response } from 'express';
import { IAuthUser } from '../../interfaces/common';
import pick from '../../../shared/pick';
import {
  foundItemsFilterableFields,
  lostItemsFilterableFields,
} from './property.constant';

const createLostProperty = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    // console.log('User Data', user);
    // console.log(req.file);

    const result = await PropertyServices.createLostProperty(
      req.body,
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
      req.body,
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
    const result = await PropertyServices.claimProperty(
      req.body,
      user as IAuthUser
    );
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
const getAllLostItems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, lostItemsFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PropertyServices.getAllLostItems(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Lost items Fetched Successfully !',
    data: result,
  });
});

const getAllFoundItems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, foundItemsFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PropertyServices.getAllFoundItems(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Found items Fetched Successfully !',
    data: result,
  });
});

const getSingleLostItems = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PropertyServices.getSingleLostItems(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Fetched Successfully !',
    data: result,
  });
});
const getSingleFoundItems = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PropertyServices.getSingleFoundItems(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Fetched Successfully !',
    data: result,
  });
});
const deleteLostItems = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PropertyServices.deleteLostItems(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Successfully !',
    data: result,
  });
});
const deleteFoundItems = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PropertyServices.deleteFoundItems(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Successfully !',
    data: result,
  });
});

const updateLostItems = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const result = await PropertyServices.updateLostItems(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated Successfully !',
    data: result,
  });
});
const updateFoundItems = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const result = await PropertyServices.updateFoundItems(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated Successfully !',
    data: result,
  });
});

export const PropertyControllers = {
  createLostProperty,
  createFoundProperty,
  claimProperty,
  myClaimItem,
  myLostItem,
  myFoundItem,
  getAllLostItems,
  getAllFoundItems,
  updateLostItems,
  getSingleLostItems,
  deleteLostItems,
  updateFoundItems,
  deleteFoundItems,
  getSingleFoundItems
};
