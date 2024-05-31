import { z } from 'zod';

const foundItemStatus = z.enum(['pending', 'approved', 'rejected']);
const updateFoundItemStatus = z.enum(['approved', 'rejected']).optional();

const lostItemStatus = z.enum(['LOST', 'FOUND']);
const lostItemCategory = z.enum([
  'Walet',
  'Key',
  'Mobail',
  'Laptop',
  'Bike',
  'Car',
  'Others',
]);
const updateLostItemStatus = z.enum(['LOST', 'FOUND']).optional();
const updateLostItemCategory = z
  .enum(['Walet', 'Key', 'Mobail', 'Laptop', 'Bike', 'Car', 'Others'])
  .optional();

const lostItemValidationSchema = z.object({
  title: z.string(),
  date: z.string(),
  status: lostItemStatus,
  category: lostItemCategory,
  contactNumber: z.string(),
  email: z.string().email(),
  color: z.string(),
  brand: z.string(),
  location: z.string(),
  description: z.string(),
  uploadImage: z.string(),
});

const updateLostItemValidationSchema = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  status: updateLostItemStatus,
  category: updateLostItemCategory,
  contactNumber: z.string().optional(),
  email: z.string().email().optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  uploadImage: z.string().optional(),
});

const updateFoundItemValidationSchema = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  status: updateFoundItemStatus,
  category: updateLostItemCategory,
  contactNumber: z.string().optional(),
  email: z.string().email().optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  uploadImage: z.string().optional(),
});
const foundItemValidationSchema = z.object({
  title: z.string(),
  date: z.string(),
  status: foundItemStatus,
  category: lostItemCategory,
  contactNumber: z.string(),
  email: z.string().email(),
  color: z.string(),
  brand: z.string(),
  location: z.string(),
  description: z.string(),
  uploadImage: z.string(),
});

const claimValidationSchema = z.object({
  description: z.string(),
  finderContactNumber: z.string(),
  uploadImage: z.string(),
});

export const PropertyValidation = {
  lostItemValidationSchema,
  foundItemValidationSchema,
  claimValidationSchema,
  updateLostItemValidationSchema,
  updateFoundItemValidationSchema,
};
