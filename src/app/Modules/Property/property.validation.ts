import { z } from 'zod';

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
  uploadImage: z.string().url().optional().default(''),
});

const foundItemValidationSchema = z.object({
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
  uploadImage: z.string().url().optional().default(''),
});

export const PropertyValidation = {
  lostItemValidationSchema,
  foundItemValidationSchema,
};
