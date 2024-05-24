import { Request } from 'express';
import { fileUploader } from '../../../shared/fileUploader';
import prisma from '../../../shared/prisma';
import { IAuthUser } from '../../interfaces/common';
import { TPaginationOptions } from '../../interfaces/pagination';
import { paginationHelper } from '../../../helpars/paginateHelpars';
import { Prisma } from '@prisma/client';

const createLostProperty = async (req: Request, user: IAuthUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const userId = userData.id;

  const file: any = req.file;
  if (file) {
    const cloudinaryUploadData = await fileUploader.uploadToCloudinary(file);
    req.body.uploadImage = cloudinaryUploadData?.secure_url;
  }
  const payloadData = { ...req.body, userId };
  const result = await prisma.lostItem.create({
    data: payloadData,
  });

  return result;
};

const createFoundProperty = async (req: Request, user: IAuthUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const userId = userData.id;

  const file: any = req.file;
  if (file) {
    const cloudinaryUploadData = await fileUploader.uploadToCloudinary(file);
    req.body.uploadImage = cloudinaryUploadData?.secure_url;
  }
  const payloadData = { ...req.body, userId };
  const result = await prisma.foundItem.create({
    data: payloadData,
  });

  return result;
};

const claimProperty = async (req: Request, user: IAuthUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const userId = userData.id;

  const file: any = req.file;
  if (file) {
    const cloudinaryUploadData = await fileUploader.uploadToCloudinary(file);
    req.body.uploadImage = cloudinaryUploadData?.secure_url;
  }
  const payloadData = { ...req.body, userId };
  const result = await prisma.claim.create({
    data: payloadData,
  });

  return result;
};

const myClaimItem = async (user: IAuthUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const getMyClaim = await prisma.claim.findMany({
    where: {
      userId: userData.id,
    },
  });

  return getMyClaim;
};
const myLostItem = async (user: IAuthUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const getMyLostItem = await prisma.lostItem.findMany({
    where: {
      userId: userData.id,
    },
  });

  return getMyLostItem;
};
const myFoundItem = async (user: IAuthUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const getMyFoundItem = await prisma.foundItem.findMany({
    where: {
      userId: userData.id,
    },
  });

  return getMyFoundItem;
};

const getAllLostItems = async (params: any, options: TPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const andConditon: Prisma.LostItemWhereInput[] = [];
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
      OR: ['description', 'title', 'location', 'email', 'contactNumber'].map(
        (value) => ({
          [value]: {
            contains: params.searchTerm,
            mode: 'insensitive',
          },
        })
      ),
    });
  }

  const whereConditions: Prisma.LostItemWhereInput =
    andConditon.length > 0
      ? {
          AND: andConditon,
        }
      : {};

  console.dir(whereConditions, { depth: 'infinity' });

  const result = await prisma.lostItem.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });

  const total = await prisma.lostItem.count({
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

const getAllFoundItems = async (params: any, options: TPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const andConditon: Prisma.FoundItemWhereInput[] = [];
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
      OR: ['description', 'title', 'location', 'email', 'contactNumber'].map(
        (value) => ({
          [value]: {
            contains: params.searchTerm,
            mode: 'insensitive',
          },
        })
      ),
    });
  }

  const whereConditions: Prisma.FoundItemWhereInput =
    andConditon.length > 0
      ? {
          AND: andConditon,
        }
      : {};

  console.dir(whereConditions, { depth: 'infinity' });

  const result = await prisma.foundItem.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });

  const total = await prisma.foundItem.count({
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

export const PropertyServices = {
  createLostProperty,
  createFoundProperty,
  claimProperty,
  myClaimItem,
  myLostItem,
  myFoundItem,
  getAllLostItems,
  getAllFoundItems,
};
