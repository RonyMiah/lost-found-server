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
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../app/config"));
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log('destination', file);
//     cb(null, path.join(process.cwd(), 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     console.log('filename', file);
//     const uniqueSuffix = Date.now() - Math.round(Math.random() * 1e9);
//     const endPath = file.mimetype.replace('image/', '');
//     cb(null, `${uniqueSuffix}.${endPath}`);
//   },
// });
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
//Cloudinary setup
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.cloud_api_key,
    api_secret: config_1.default.cloud_api_secret,
});
const uploadToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, rejects) => {
        cloudinary_1.v2.uploader.upload(file.path, (error, result) => {
            //uploads photo delete
            fs_1.default.unlinkSync(file.path);
            if (error) {
                rejects(error);
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.fileUploader = {
    upload,
    uploadToCloudinary,
};
