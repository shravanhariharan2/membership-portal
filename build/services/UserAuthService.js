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
const routing_controllers_1 = require("routing-controllers");
const jwt = require("jsonwebtoken");
const UserRepository_1 = require("../repositories/UserRepository");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const config_1 = require("../config");
const repositories_1 = require("../repositories");
let UserAuthService = /** @class */ (() => {
    var UserAuthService_1;
    let UserAuthService = UserAuthService_1 = class UserAuthService {
        checkAuthToken(authHeader) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = jwt.verify(UserAuthService_1.parseAuthHeader(authHeader), config_1.Config.auth.secret);
                if (!UserAuthService_1.isAuthToken(token))
                    throw new routing_controllers_1.BadRequestError('Invalid auth token');
                const user = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    return userRepository.findByUuid(token.uuid);
                }));
                if (!user)
                    throw new routing_controllers_1.NotFoundError();
                return user;
            });
        }
        login(email, pass) {
            return __awaiter(this, void 0, void 0, function* () {
                const authenticatedUser = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    const user = yield userRepository.findByEmail(email.toLowerCase());
                    if (!user)
                        throw new routing_controllers_1.NotFoundError('There is no account associated with that email');
                    if (user.isBlocked())
                        throw new routing_controllers_1.ForbiddenError('Your account has been blocked');
                    if (!(yield user.verifyPass(pass)))
                        throw new routing_controllers_1.ForbiddenError('Incorrect password');
                    const activityRepository = repositories_1.default.activity(txn);
                    yield activityRepository.logActivity(user, types_1.ActivityType.ACCOUNT_LOGIN);
                    return user;
                }));
                const token = {
                    uuid: authenticatedUser.uuid,
                    admin: authenticatedUser.isAdmin(),
                };
                return jwt.sign(token, config_1.Config.auth.secret, { expiresIn: config_1.Config.auth.tokenLifespan });
            });
        }
        checkCredentials(email, pass) {
            return __awaiter(this, void 0, void 0, function* () {
                const authenticatedUser = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    const user = yield userRepository.findByEmail(email.toLowerCase());
                    if (!user)
                        throw new routing_controllers_1.NotFoundError('There is no account associated with that email');
                    const passwordMatched = yield user.verifyPass(pass);
                    if (!passwordMatched)
                        throw new routing_controllers_1.ForbiddenError('Incorrect password');
                    const activityRepository = repositories_1.default.activity(txn);
                    yield activityRepository.logActivity(user, types_1.ActivityType.ACCOUNT_LOGIN);
                    return user;
                }));
                if (authenticatedUser.isBlocked())
                    throw new routing_controllers_1.ForbiddenError('Your account has been blocked');
                return authenticatedUser;
            });
        }
        static generateAuthToken(user) {
            const token = {
                uuid: user.uuid,
                admin: user.isAdmin(),
            };
            return jwt.sign(token, config_1.Config.auth.secret, { expiresIn: config_1.Config.auth.tokenLifespan });
        }
        changeAccessCode(user) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    yield userRepository.changeAccessCode(user);
                }));
            });
        }
        setAccountStateToPasswordReset(user) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    yield userRepository.setStateToPasswordReset(user);
                    const activityRepository = repositories_1.default.activity(txn);
                    yield activityRepository.logActivity(user, types_1.ActivityType.ACCOUNT_RESET_PASS_REQUEST);
                }));
            });
        }
        resetPassword(accessCode, newPassword) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction('SERIALIZABLE', (txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    const user = yield userRepository.findByAccessCode(accessCode);
                    if (!user)
                        throw new routing_controllers_1.BadRequestError('Invalid access code');
                    yield userRepository.upsertUser(user, {
                        accessCode: null,
                        hash: yield UserRepository_1.UserRepository.generateHash(newPassword),
                        state: types_1.UserState.ACTIVE,
                    });
                    const activityRepository = repositories_1.default.activity(txn);
                    activityRepository.logActivity(user, types_1.ActivityType.ACCOUNT_RESET_PASS);
                    return user;
                }));
            });
        }
        static parseAuthHeader(authHeader) {
            const splitHeader = authHeader.split(' ');
            const invalidAuthFormat = splitHeader.length !== 2
                || splitHeader[0] !== 'Bearer'
                || splitHeader[1].length === 0;
            if (invalidAuthFormat) {
                throw new routing_controllers_1.ForbiddenError();
            }
            return splitHeader[1];
        }
        static isAuthToken(token) {
            return typeof token === 'object' && 'uuid' in token;
        }
    };
    __decorate([
        typeorm_typedi_extensions_1.InjectManager(),
        __metadata("design:type", typeorm_1.EntityManager)
    ], UserAuthService.prototype, "entityManager", void 0);
    UserAuthService = UserAuthService_1 = __decorate([
        typedi_1.Service()
    ], UserAuthService);
    return UserAuthService;
})();
exports.default = UserAuthService;
