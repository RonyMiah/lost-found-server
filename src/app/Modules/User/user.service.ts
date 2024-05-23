import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import { userRole } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

type CreateUserPayload = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type CreateAdminPayload = {
  userName: string;
  email: string;
  password: string;
};

const createUser = async (payload: CreateUserPayload) => {
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

const createAdmin = async (payload: CreateAdminPayload) => {
  const hashPassword = bcrypt.hashSync(payload.password, 12);

  const role = userRole.ADMIN;

  const userData = {
    userName: payload.userName,
    email: payload.email,
    password: hashPassword,
    role,
  };

  const result = await prisma.$transaction(async (transatctionClient) => {
    await transatctionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transatctionClient.admin.create({
      data: userData,
    });

    return createdAdminData;
  });

  const { password, ...returnData } = result;
  return returnData;
};

export const UserServices = {
  createUser,
  createAdmin,
};
