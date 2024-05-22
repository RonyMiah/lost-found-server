import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import { userRole } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

type User = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const createUser = async (payload: User) => {
  if (!(payload?.password === payload.confirmPassword)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password Do not Match');
  }

  const hashPassword = bcrypt.hashSync(payload.password, 12);

  const role = userRole.USER;

  const userData = {
    userName: payload.userName,
    email: payload.email,
    password: hashPassword,
    role,
  };

  const result = await prisma.user.create({
    data: userData,
  });
  const { password, ...returnData } = result;
  return returnData;
};

export const UserServices = {
  createUser,
};
