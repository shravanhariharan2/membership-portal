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
exports.AdminController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UserAuthentication_1 = require("../middleware/UserAuthentication");
const AdminControllerRequests_1 = require("../validators/AdminControllerRequests");
const types_1 = require("../../types");
const AuthenticatedUser_1 = require("../decorators/AuthenticatedUser");
const UserAccountService_1 = require("../../services/UserAccountService");
const StorageService_1 = require("../../services/StorageService");
const PermissionsService_1 = require("../../services/PermissionsService");
const UserModel_1 = require("../../models/UserModel");
let AdminController = /** @class */ (() => {
    let AdminController = class AdminController {
        createMilestone(milestone, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canCreateMilestones(user))
                    throw new routing_controllers_1.ForbiddenError();
                yield this.userAccountService.createMilestone(milestone);
                return { error: null };
            });
        }
        addBonus(bonus, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canGrantPointBonuses(user))
                    throw new routing_controllers_1.ForbiddenError();
                const emails = bonus.users;
                yield this.userAccountService.grantBonusPoints(emails, bonus.description, bonus.points);
                return { error: null, emails };
            });
        }
        uploadBanner(file) {
            return __awaiter(this, void 0, void 0, function* () {
                const banner = yield this.storageService.upload(file, types_1.MediaType.BANNER, 'banner');
                return { error: null, banner };
            });
        }
    };
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", StorageService_1.default)
    ], AdminController.prototype, "storageService", void 0);
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", UserAccountService_1.default)
    ], AdminController.prototype, "userAccountService", void 0);
    __decorate([
        routing_controllers_1.Post('/milestone'),
        __param(0, routing_controllers_1.BodyParam('milestone')),
        __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AdminControllerRequests_1.CreateMilestoneRequest,
            UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], AdminController.prototype, "createMilestone", null);
    __decorate([
        routing_controllers_1.Post('/bonus'),
        __param(0, routing_controllers_1.BodyParam('bonus')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AdminControllerRequests_1.CreateBonusRequest, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], AdminController.prototype, "addBonus", null);
    __decorate([
        routing_controllers_1.Post('/banner'),
        __param(0, routing_controllers_1.UploadedFile('image', { options: StorageService_1.default.getFileOptions(types_1.MediaType.BANNER) })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AdminController.prototype, "uploadBanner", null);
    AdminController = __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.JsonController('/admin')
    ], AdminController);
    return AdminController;
})();
exports.AdminController = AdminController;
