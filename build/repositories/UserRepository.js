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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserModel_1 = require("../models/UserModel");
const types_1 = require("../types");
const BaseRepository_1 = require("./BaseRepository");
let UserRepository = /** @class */ (() => {
    var UserRepository_1;
    let UserRepository = UserRepository_1 = class UserRepository extends BaseRepository_1.BaseRepository {
        upsertUser(user, changes) {
            return __awaiter(this, void 0, void 0, function* () {
                if (changes)
                    user = UserModel_1.UserModel.merge(user, changes);
                return this.repository.save(user);
            });
        }
        findAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find();
            });
        }
        findByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.findOne({ uuid });
            });
        }
        findByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.findOne({ email });
            });
        }
        findByEmails(emails) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({
                    email: typeorm_1.In(emails),
                });
            });
        }
        findByAccessCode(accessCode) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.findOne({ accessCode });
            });
        }
        static generateAccessCode() {
            return crypto.randomBytes(16).toString('hex');
        }
        changeAccessCode(user) {
            return __awaiter(this, void 0, void 0, function* () {
                user.accessCode = UserRepository_1.generateAccessCode();
                return this.repository.save(user);
            });
        }
        setStateToPasswordReset(user) {
            return __awaiter(this, void 0, void 0, function* () {
                user.accessCode = UserRepository_1.generateAccessCode();
                user.state = types_1.UserState.PASSWORD_RESET;
                return this.repository.save(user);
            });
        }
        getLeaderboard(offset = 0, limit = 1000) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({
                    skip: offset,
                    take: limit,
                    where: {
                        accessType: typeorm_1.Not(types_1.UserAccessType.ADMIN),
                        state: [
                            typeorm_1.Not(types_1.UserState.PENDING),
                            typeorm_1.Not(types_1.UserState.BLOCKED),
                        ],
                    },
                    order: { points: 'DESC' },
                });
            });
        }
        static generateHash(pass) {
            return __awaiter(this, void 0, void 0, function* () {
                return bcrypt.hash(pass, this.SALT_ROUNDS);
            });
        }
        addPoints(user, points) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.increment(user, 'points', points);
            });
        }
        addPointsToMany(users, points) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.createQueryBuilder()
                    .update()
                    .set({ points: () => `points + ${points}` })
                    .where(users)
                    .execute();
            });
        }
        addPointsToAll(points) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.createQueryBuilder()
                    .update()
                    .set({ points: () => `points + ${points}` })
                    .execute();
            });
        }
    };
    UserRepository.SALT_ROUNDS = 10;
    UserRepository = UserRepository_1 = __decorate([
        typeorm_1.EntityRepository(UserModel_1.UserModel)
    ], UserRepository);
    return UserRepository;
})();
exports.UserRepository = UserRepository;
