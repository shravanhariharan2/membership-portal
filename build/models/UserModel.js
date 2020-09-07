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
exports.UserModel = void 0;
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const bcrypt = require("bcrypt");
const types_1 = require("../types");
const ActivityModel_1 = require("./ActivityModel");
const AttendanceModel_1 = require("./AttendanceModel");
const OrderModel_1 = require("./OrderModel");
let UserModel = /** @class */ (() => {
    let UserModel = class UserModel extends typeorm_1.BaseEntity {
        isBlocked() {
            return this.state === types_1.UserState.BLOCKED;
        }
        verifyPass(pass) {
            return __awaiter(this, void 0, void 0, function* () {
                return bcrypt.compare(pass, this.hash);
            });
        }
        markAsVerified() {
            this.state = types_1.UserState.ACTIVE;
            return this.save();
        }
        hasEnoughCredits(credits) {
            return this.credits >= credits;
        }
        isAdmin() {
            return this.accessType === types_1.UserAccessType.ADMIN;
        }
        isStaff() {
            return this.accessType === types_1.UserAccessType.STAFF;
        }
        getPublicProfile() {
            return underscore_1.pick(this, [
                'firstName',
                'lastName',
                'profilePicture',
                'graduationYear',
                'major',
                'bio',
                'points',
            ]);
        }
        getFullUserProfile() {
            return underscore_1.pick(this, [
                'email',
                'firstName',
                'lastName',
                'profilePicture',
                'accessType',
                'state',
                'graduationYear',
                'major',
                'bio',
                'points',
                'credits',
            ]);
        }
    };
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], UserModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], UserModel.prototype, "uuid", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], UserModel.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], UserModel.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], UserModel.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], UserModel.prototype, "hash", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], UserModel.prototype, "profilePicture", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: types_1.UserAccessType,
            default: types_1.UserAccessType.STANDARD,
        }),
        __metadata("design:type", String)
    ], UserModel.prototype, "accessType", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: types_1.UserState,
            default: types_1.UserState.PENDING,
        }),
        __metadata("design:type", String)
    ], UserModel.prototype, "state", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], UserModel.prototype, "accessCode", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], UserModel.prototype, "graduationYear", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], UserModel.prototype, "major", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: true,
        }),
        __metadata("design:type", String)
    ], UserModel.prototype, "bio", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        typeorm_1.Index('leaderboard_index'),
        __metadata("design:type", Number)
    ], UserModel.prototype, "points", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], UserModel.prototype, "credits", void 0);
    __decorate([
        typeorm_1.Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP(6)' }),
        __metadata("design:type", Date)
    ], UserModel.prototype, "lastLogin", void 0);
    __decorate([
        typeorm_1.OneToMany((type) => ActivityModel_1.ActivityModel, (activity) => activity.user, { cascade: true }),
        __metadata("design:type", Array)
    ], UserModel.prototype, "activities", void 0);
    __decorate([
        typeorm_1.OneToMany((type) => AttendanceModel_1.AttendanceModel, (attendance) => attendance.user, { cascade: true }),
        __metadata("design:type", Array)
    ], UserModel.prototype, "attendances", void 0);
    __decorate([
        typeorm_1.OneToMany((type) => OrderModel_1.OrderModel, (order) => order.user, { cascade: true }),
        __metadata("design:type", Array)
    ], UserModel.prototype, "orders", void 0);
    UserModel = __decorate([
        typeorm_1.Entity('Users')
    ], UserModel);
    return UserModel;
})();
exports.UserModel = UserModel;
