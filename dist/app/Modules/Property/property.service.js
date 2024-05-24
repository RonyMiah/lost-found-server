"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyServices = void 0;
const fileUploader_1 = require("../../../shared/fileUploader");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createLostProperty = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const userId = userData.id;
    const file = req.file;
    if (file) {
        const cloudinaryUploadData = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.uploadImage = cloudinaryUploadData === null || cloudinaryUploadData === void 0 ? void 0 : cloudinaryUploadData.secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, req.body), { userId });
    const result = yield prisma_1.default.lostItem.create({
        data: payloadData,
    });
    return result;
});
const createFoundProperty = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const userId = userData.id;
    const file = req.file;
    if (file) {
        const cloudinaryUploadData = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.uploadImage = cloudinaryUploadData === null || cloudinaryUploadData === void 0 ? void 0 : cloudinaryUploadData.secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, req.body), { userId });
    const result = yield prisma_1.default.foundItem.create({
        data: payloadData,
    });
    return result;
});
const claimProperty = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const userId = userData.id;
    const file = req.file;
    if (file) {
        const cloudinaryUploadData = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.uploadImage = cloudinaryUploadData === null || cloudinaryUploadData === void 0 ? void 0 : cloudinaryUploadData.secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, req.body), { userId });
    const result = yield prisma_1.default.claim.create({
        data: payloadData,
    });
    return result;
});
const myClaimItem = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const getMyClaim = yield prisma_1.default.claim.findMany({
        where: {
            userId: userData.id,
        },
    });
    return getMyClaim;
});
const myLostItem = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const getMyLostItem = yield prisma_1.default.lostItem.findMany({
        where: {
            userId: userData.id,
        },
    });
    return getMyLostItem;
});
const myFoundItem = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const getMyFoundItem = yield prisma_1.default.foundItem.findMany({
        where: {
            userId: userData.id,
        },
    });
    return getMyFoundItem;
});
exports.PropertyServices = {
    createLostProperty,
    createFoundProperty,
    claimProperty,
    myClaimItem,
    myLostItem,
    myFoundItem,
};
