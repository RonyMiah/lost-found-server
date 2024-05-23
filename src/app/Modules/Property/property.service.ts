import { Request } from 'express';
import { fileUploader } from '../../../shared/fileUploader';
import prisma from '../../../shared/prisma';

const createLostProperty = async (req: Request) => {
  const file: any = req.file;
  if (file) {
    const cloudinaryUploadData = await fileUploader.uploadToCloudinary(file);
    req.body.uploadImage = cloudinaryUploadData?.secure_url;
  }
  console.log(req.body);
  const result = await prisma.lostItem.create({
    data: req.body,
  });

  return result;
};

export const PropertyServices = {
  createLostProperty,
};
