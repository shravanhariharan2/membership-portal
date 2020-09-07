"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const aws = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const routing_controllers_1 = require("routing-controllers");
const config_1 = require("../config");
const types_1 = require("../types");
let StorageService = /** @class */ (() => {
    var StorageService_1;
    let StorageService = StorageService_1 = class StorageService {
        constructor() {
            this.s3 = new aws.S3({
                apiVersion: '2006-03-01',
                region: config_1.Config.s3.region,
                credentials: config_1.Config.s3.credentials,
            });
        }
        upload(file, mediaType, fileName) {
            return __awaiter(this, void 0, void 0, function* () {
                const { uploadPath } = StorageService_1.getMediaConfig(mediaType);
                const params = {
                    ACL: 'public-read',
                    Body: file.buffer,
                    Bucket: config_1.Config.s3.bucket,
                    Key: `${uploadPath}/${fileName}${path.extname(file.originalname)}`,
                };
                const data = yield this.s3.upload(params).promise();
                return data.Location;
            });
        }
        static getFileOptions(mediaType) {
            const mediaConfig = StorageService_1.getMediaConfig(mediaType);
            return {
                storage: multer.memoryStorage(),
                limits: {
                    fileSize: mediaConfig.maxFileSize,
                },
            };
        }
        static getMediaConfig(type) {
            switch (type) {
                case types_1.MediaType.EVENT_COVER: {
                    return {
                        type: types_1.MediaType.EVENT_COVER,
                        maxFileSize: config_1.Config.file.MAX_EVENT_COVER_FILE_SIZE,
                        uploadPath: config_1.Config.file.EVENT_COVER_UPLOAD_PATH,
                    };
                }
                case types_1.MediaType.PROFILE_PICTURE: {
                    return {
                        type: types_1.MediaType.PROFILE_PICTURE,
                        maxFileSize: config_1.Config.file.MAX_PROFILE_PICTURE_FILE_SIZE,
                        uploadPath: config_1.Config.file.PROFILE_PICTURE_UPLOAD_PATH,
                    };
                }
                case types_1.MediaType.BANNER: {
                    return {
                        type: types_1.MediaType.BANNER,
                        maxFileSize: config_1.Config.file.MAX_BANNER_FILE_SIZE,
                        uploadPath: config_1.Config.file.BANNER_UPLOAD_PATH,
                    };
                }
                default: {
                    throw new routing_controllers_1.InternalServerError('Invalid media type for file');
                }
            }
        }
    };
    StorageService = StorageService_1 = __decorate([
        typedi_1.Service()
    ], StorageService);
    return StorageService;
})();
exports.default = StorageService;
