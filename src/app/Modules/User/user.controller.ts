import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  // console.log(req.file);
//   console.log(req.body);

  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully ',
    // meta: result.meta,
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
