import { userStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { JwtHelpares } from '../../../helpars/jwtHelpars';
import config from '../../config';

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: userStatus.ACTIVE,
    },
  });

  const comparieData: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!comparieData) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password Do not Match ');
  }

  const accessToken = JwtHelpares.generateToken(
    { email: userData.email, role: userData.role, id: userData.id },
    config.jwt_secret as string,
    config.jwt_expire_in as string
  );
  const refreshToken = JwtHelpares.generateToken(
    { email: userData.email, role: userData.role, id: userData.id },
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
