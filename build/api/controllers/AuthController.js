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
exports.AuthController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UserAccountService_1 = require("../../services/UserAccountService");
const UserAuthService_1 = require("../../services/UserAuthService");
const Logger_1 = require("../../utils/Logger");
const RequestTrace_1 = require("../decorators/RequestTrace");
const EmailService_1 = require("../../services/EmailService");
const AuthControllerRequests_1 = require("../validators/AuthControllerRequests");
const AuthActionMetadata_1 = require("../../utils/AuthActionMetadata");
let AuthController = /** @class */ (() => {
    let AuthController = class AuthController {
        register(registrationRequest, trace) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userAccountService.registerUser(registrationRequest);
                this.emailService.sendEmailVerification(user.email, user.firstName, user.accessCode);
                Logger_1.logger.info('user authentication (registration)', AuthActionMetadata_1.authActionMetadata(trace, user));
                return { error: null, user: user.getFullUserProfile() };
            });
        }
        login(loginRequest, trace) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userAuthService.checkCredentials(loginRequest.email, loginRequest.password);
                const token = UserAuthService_1.default.generateAuthToken(user);
                Logger_1.logger.info('user authentication (login)', AuthActionMetadata_1.authActionMetadata(trace, user));
                return { error: null, token };
            });
        }
        resendEmailVerification(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userAccountService.findByEmail(email);
                yield this.userAuthService.changeAccessCode(user);
                yield this.emailService.sendEmailVerification(user.email, user.firstName, user.accessCode);
                return { error: null };
            });
        }
        verifyEmail(accessCode) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userAccountService.findByAccessCode(accessCode);
                yield user.markAsVerified();
                return { error: null };
            });
        }
        sendPasswordResetEmail(email, trace) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userAccountService.findByEmail(email);
                yield this.userAuthService.setAccountStateToPasswordReset(user);
                yield this.emailService.sendPasswordReset(user.email, user.firstName, user.accessCode);
                Logger_1.logger.info('user authentication (password reset - email)', AuthActionMetadata_1.authActionMetadata(trace, user));
                return { error: null };
            });
        }
        resetPassword(accessCode, passwordResetRequest, trace) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userAuthService.resetPassword(accessCode, passwordResetRequest.user.newPassword);
                Logger_1.logger.info('user authentication (password reset - access code)', AuthActionMetadata_1.authActionMetadata(trace, user));
                return { error: null };
            });
        }
    };
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", UserAccountService_1.default)
    ], AuthController.prototype, "userAccountService", void 0);
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", UserAuthService_1.default)
    ], AuthController.prototype, "userAuthService", void 0);
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", EmailService_1.default)
    ], AuthController.prototype, "emailService", void 0);
    __decorate([
        routing_controllers_1.Post('/registration'),
        __param(0, routing_controllers_1.BodyParam('user')), __param(1, RequestTrace_1.RequestTrace()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AuthControllerRequests_1.RegistrationRequest, String]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "register", null);
    __decorate([
        routing_controllers_1.Post('/login'),
        __param(0, routing_controllers_1.Body()), __param(1, RequestTrace_1.RequestTrace()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AuthControllerRequests_1.LoginRequest, String]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "login", null);
    __decorate([
        routing_controllers_1.Get('/emailVerification/:email'),
        __param(0, routing_controllers_1.Param('email')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "resendEmailVerification", null);
    __decorate([
        routing_controllers_1.Post('/emailVerification/:accessCode'),
        __param(0, routing_controllers_1.Param('accessCode')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "verifyEmail", null);
    __decorate([
        routing_controllers_1.Get('/passwordReset/:email'),
        __param(0, routing_controllers_1.Param('email')), __param(1, RequestTrace_1.RequestTrace()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "sendPasswordResetEmail", null);
    __decorate([
        routing_controllers_1.Post('/passwordReset/:accessCode'),
        __param(0, routing_controllers_1.Param('accessCode')),
        __param(1, routing_controllers_1.Body()),
        __param(2, RequestTrace_1.RequestTrace()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, AuthControllerRequests_1.PasswordResetRequest, String]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "resetPassword", null);
    AuthController = __decorate([
        routing_controllers_1.JsonController('/auth')
    ], AuthController);
    return AuthController;
})();
exports.AuthController = AuthController;
