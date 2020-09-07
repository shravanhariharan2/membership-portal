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
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_1 = require("typeorm");
const repositories_1 = require("../repositories");
const types_1 = require("../types");
const UserRepository_1 = require("../repositories/UserRepository");
const UserModel_1 = require("../models/UserModel");
let UserAccountService = /** @class */ (() => {
    let UserAccountService = class UserAccountService {
        registerUser(registrationRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    const user = yield userRepository.upsertUser(UserModel_1.UserModel.create(Object.assign(Object.assign({}, registrationRequest), { hash: yield UserRepository_1.UserRepository.generateHash(registrationRequest.password), accessCode: UserRepository_1.UserRepository.generateAccessCode() })));
                    const activityRepository = repositories_1.default.activity(txn);
                    yield activityRepository.logActivity(user, types_1.ActivityType.ACCOUNT_CREATE);
                    return user;
                }));
            });
        }
        findAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    return userRepository.findAll();
                }));
            });
        }
        findByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    return userRepository.findByUuid(uuid);
                }));
                if (!user)
                    throw new routing_controllers_1.NotFoundError();
                return user;
            });
        }
        findByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    return userRepository.findByEmail(email);
                }));
                if (!user)
                    throw new routing_controllers_1.NotFoundError();
                return user;
            });
        }
        findByAccessCode(accessCode) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    return userRepository.findByAccessCode(accessCode);
                }));
                if (!user)
                    throw new routing_controllers_1.NotFoundError();
                return user;
            });
        }
        getLeaderboard() {
            return __awaiter(this, void 0, void 0, function* () {
                const users = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    return userRepository.getLeaderboard();
                }));
                return users.map((u) => u.getPublicProfile());
            });
        }
        update(user, patchUserRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                const changes = patchUserRequest;
                if (patchUserRequest.passwordChange) {
                    const { password: currentPassword, newPassword } = patchUserRequest.passwordChange;
                    if (!(yield user.verifyPass(currentPassword))) {
                        throw new routing_controllers_1.BadRequestError('Incorrect password');
                    }
                    changes.hash = yield UserRepository_1.UserRepository.generateHash(newPassword);
                }
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const activityRepository = repositories_1.default.activity(txn);
                    const updatedFields = Object.keys(patchUserRequest).join(', ');
                    yield activityRepository.logActivity(user, types_1.ActivityType.ACCOUNT_UPDATE_INFO, 0, updatedFields);
                    const userRepository = repositories_1.default.user(txn);
                    return userRepository.upsertUser(user, changes);
                }));
            });
        }
        updateProfilePicture(user, profilePicture) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    return userRepository.upsertUser(user, { profilePicture });
                }));
            });
        }
        getUserActivityStream(user) {
            return __awaiter(this, void 0, void 0, function* () {
                const stream = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const activityRepository = repositories_1.default.activity(txn);
                    return activityRepository.getUserActivityStream(user);
                }));
                return stream.map((activity) => activity.getPublicActivity());
            });
        }
        createMilestone(milestone) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    yield userRepository.addPointsToAll(milestone.points);
                    const activityRepository = repositories_1.default.activity(txn);
                    yield activityRepository.logMilestone(milestone.name, milestone.points);
                }));
            });
        }
        grantBonusPoints(emails, description, points) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const userRepository = repositories_1.default.user(txn);
                    const users = yield userRepository.findByEmails(emails);
                    if (users.length !== emails.length) {
                        throw new routing_controllers_1.BadRequestError('Couldn\'t find accounts matching one or more emails');
                    }
                    yield userRepository.addPointsToMany(users, points);
                    const activityRepository = repositories_1.default.activity(txn);
                    yield activityRepository.logBonus(users, description, points);
                }));
            });
        }
    };
    __decorate([
        typeorm_typedi_extensions_1.InjectManager(),
        __metadata("design:type", typeorm_1.EntityManager)
    ], UserAccountService.prototype, "entityManager", void 0);
    UserAccountService = __decorate([
        typedi_1.Service()
    ], UserAccountService);
    return UserAccountService;
})();
exports.default = UserAccountService;
