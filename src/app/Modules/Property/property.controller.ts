import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PropertyServices } from './property.service';

const createLostProperty = catchAsync(async (req, res) => {
  const result = await PropertyServices.createLostProperty(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lost property Submited Successfully ',
    data: result,
  });
});
const createFoundProperty = catchAsync(async (req, res) => {
  const result = await PropertyServices.createFoundProperty(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Found property Submited Successfully !',
    data: result,
  });
});
const claimProperty = catchAsync(async (req, res) => {
  const result = await PropertyServices.claimProperty(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Claim Process Successfully !',
    data: result,
  });
});

export const PropertyControllers = {
  createLostProperty,
  createFoundProperty,
  claimProperty,
};
