import { z } from 'zod';

const createUserSchemaValidation = z.object({
  userName: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const userValidation = {
  createUserSchemaValidation,
};
