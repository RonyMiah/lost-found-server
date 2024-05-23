import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import { Prisma, userRole } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TPaginationOptions } from '../../interfaces/pagination';
import { paginationHelper } from '../../../helpars/paginateHelpars';
import { userSearchAbleFields } from './user.constant';
import { IAuthUser } from '../../interfaces/common';
import { IFile } from '../../interfaces/file';
import { Request } from 'express';
import { fileUploader } from '../../../shared/fileUploader';

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

const getAllDataFromDB = async (params: any, options: TPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const andConditon: Prisma.UserWhereInput[] = [];

  if (Object.keys(filterData).length > 0) {
    andConditon.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  if (params.searchTerm) {
    andConditon.push({
      OR: userSearchAbleFields.map((value) => ({
        [value]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  //   console.dir(andConditon, { depth: 'infinity' });

  const whereConditions: Prisma.UserWhereInput =
    andConditon.length > 0
      ? {
          AND: andConditon,
        }
      : {};

  // console.log(options);

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      upodatedAt: true,
    }, // sorting dependend on time
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const changeProfileStatus = async (id: string, data: userRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      upodatedAt: true,
    },
    data,
  });

  return updateUserStatus;
};

const getMe = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
    },
  });

  let profileInfo;
  if (userInfo.role === userRole.SUPPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === userRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === userRole.USER) {
    profileInfo = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

const updateProfile = async (user: IAuthUser, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinaryData = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinaryData?.secure_url;
  }

  let profileInfo;
  if (userInfo.role === userRole.SUPPER_ADMIN) {
    profileInfo = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          email: userInfo.email,
        },
        data: req.body,
      });
      const updatedProfile = await tx.admin.update({
        where: {
          email: userInfo.email,
        },
        data: req.body,
      });

      return updatedProfile;
    });
  } else if (userInfo.role === userRole.ADMIN) {
    profileInfo = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          email: userInfo.email,
        },
        data: req.body,
      });
      const updatedProfile = await tx.admin.update({
        where: {
          email: userInfo.email,
        },
        data: req.body,
      });

      return updatedProfile;
    });
  } else if (userInfo.role === userRole.USER) {
    profileInfo = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          email: userInfo.email,
        },
        data: req.body,
      });
      const updatedProfile = await tx.admin.update({
        where: {
          email: userInfo.email,
        },
        data: req.body,
      });

      return updatedProfile;
    });
  }

  return { ...profileInfo };
};

export const UserServices = {
  createUser,
  createAdmin,
  getAllDataFromDB,
  changeProfileStatus,
  getMe,
  updateProfile,
};
