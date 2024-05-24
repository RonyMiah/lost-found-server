import { Request } from 'express';
import { fileUploader } from '../../../shared/fileUploader';
import prisma from '../../../shared/prisma';
import { IAuthUser } from '../../interfaces/common';

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

export const PropertyServices = {
  createLostProperty,
  createFoundProperty,
  claimProperty,
  myClaimItem,
  myLostItem,
  myFoundItem,
};
