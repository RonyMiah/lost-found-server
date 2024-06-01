"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyValidation = void 0;
const zod_1 = require("zod");
const foundItemStatus = zod_1.z.enum(['pending', 'approved', 'rejected']);
const updateFoundItemStatus = zod_1.z.enum(['approved', 'rejected']).optional();
const lostItemStatus = zod_1.z.enum(['LOST', 'FOUND']);
const lostItemCategory = zod_1.z.enum([
    'Walet',
    'Key',
    'Mobail',
    'Laptop',
    'Bike',
    'Car',
    'Others',
]);
const updateLostItemStatus = zod_1.z.enum(['LOST', 'FOUND']).optional();
const updateLostItemCategory = zod_1.z
    .enum(['Walet', 'Key', 'Mobail', 'Laptop', 'Bike', 'Car', 'Others'])
    .optional();
const lostItemValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    date: zod_1.z.string(),
    status: lostItemStatus,
    category: lostItemCategory,
    contactNumber: zod_1.z.string(),
    email: zod_1.z.string().email(),
    color: zod_1.z.string(),
    brand: zod_1.z.string(),
    location: zod_1.z.string(),
    description: zod_1.z.string(),
    uploadImage: zod_1.z.string(),
});
const updateLostItemValidationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    status: updateLostItemStatus,
    category: updateLostItemCategory,
    contactNumber: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    color: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    uploadImage: zod_1.z.string().optional(),
});
const updateFoundItemValidationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    status: updateFoundItemStatus,
    category: updateLostItemCategory,
    contactNumber: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    color: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    uploadImage: zod_1.z.string().optional(),
});
const foundItemValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    date: zod_1.z.string(),
    status: foundItemStatus,
    category: lostItemCategory,
    contactNumber: zod_1.z.string(),
    email: zod_1.z.string().email(),
    color: zod_1.z.string(),
    brand: zod_1.z.string(),
    location: zod_1.z.string(),
    description: zod_1.z.string(),
    uploadImage: zod_1.z.string(),
});
const claimValidationSchema = zod_1.z.object({
    description: zod_1.z.string(),
    finderContactNumber: zod_1.z.string(),
    uploadImage: zod_1.z.string(),
});
exports.PropertyValidation = {
    lostItemValidationSchema,
    foundItemValidationSchema,
    claimValidationSchema,
    updateLostItemValidationSchema,
    updateFoundItemValidationSchema,
};
