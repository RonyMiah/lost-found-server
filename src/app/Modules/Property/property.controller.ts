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

export const PropertyControllers = {
  createLostProperty,
};