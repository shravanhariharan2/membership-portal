"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UserModel_1 = require("../../models/UserModel");
const UserAccountService_1 = require("../../services/UserAccountService");
const StorageService_1 = require("../../services/StorageService");
const UserAuthentication_1 = require("../middleware/UserAuthentication");
const AuthenticatedUser_1 = require("../decorators/AuthenticatedUser");
const types_1 = require("../../types");
const UserControllerRequests_1 = require("../validators/UserControllerRequests");
let UserController = /** @class */ (() => {
    let UserController = class UserController {
        getUserActivityStream(user) {
            return __awaiter(this, void 0, void 0, function* () {
                const stream = yield this.userAccountService.getUserActivityStream(user.uuid);
                return { error: null, activity: stream };
            });
        }
        updateProfilePicture(file, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const profilePicture = yield this.storageService.upload(file, types_1.MediaType.PROFILE_PICTURE, user.uuid);
                const updatedUser = yield this.userAccountService.updateProfilePicture(user, profilePicture);
                return { error: null, user: updatedUser };
            });
        }
        getUser(uuid, currentUser) {
            return __awaiter(this, void 0, void 0, function* () {
                if (uuid === currentUser.uuid) {
                    return this.getCurrentUser(currentUser);
                }
                const user = yield this.userAccountService.findByUuid(uuid);
                if (!user) {
                    throw new routing_controllers_1.NotFoundError('User was not found');
                }
                return { error: null, user: user.getPublicProfile() };
            });
        }
        getCurrentUser(user) {
            return __awaiter(this, void 0, void 0, function* () {
                return { error: null, user: user.getFullUserProfile() };
            });
        }
        patchCurrentUser(patches, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const patchedUser = yield this.userAccountService.update(user, patches);
                return { error: null, user: patchedUser.getFullUserProfile() };
            });
        }
    };
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", UserAccountService_1.default)
    ], UserController.prototype, "userAccountService", void 0);
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", StorageService_1.default)
    ], UserController.prototype, "storageService", void 0);
    __decorate([
        routing_controllers_1.Get('/activity'),
        __param(0, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getUserActivityStream", null);
    __decorate([
        routing_controllers_1.Post('/picture'),
        __param(0, routing_controllers_1.UploadedFile('image', { options: StorageService_1.default.getFileOptions(types_1.MediaType.PROFILE_PICTURE) })),
        __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "updateProfilePicture", null);
    __decorate([
        routing_controllers_1.Get('/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getUser", null);
    __decorate([
        routing_controllers_1.Get(),
        __param(0, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getCurrentUser", null);
    __decorate([
        routing_controllers_1.Patch(),
        __param(0, routing_controllers_1.BodyParam('user')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UserControllerRequests_1.PatchUserRequest, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "patchCurrentUser", null);
    UserController = __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.JsonController('/user')
    ], UserController);
    return UserController;
})();
exports.UserController = UserController;
