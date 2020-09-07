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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModel = void 0;
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const types_1 = require("../types");
const UserModel_1 = require("./UserModel");
let ActivityModel = /** @class */ (() => {
    let ActivityModel = class ActivityModel extends typeorm_1.BaseEntity {
        getPublicActivity() {
            return underscore_1.pick(this, [
                'type',
                'description',
                'pointsEarned',
                'timestamp',
            ]);
        }
    };
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], ActivityModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], ActivityModel.prototype, "uuid", void 0);
    __decorate([
        typeorm_1.ManyToOne((type) => UserModel_1.UserModel, (user) => user.activities, { nullable: false }),
        typeorm_1.JoinColumn({ name: 'user' }),
        typeorm_1.Index('public_activities_by_user_index', { where: 'public IS true' }),
        __metadata("design:type", UserModel_1.UserModel)
    ], ActivityModel.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: types_1.ActivityType,
        }),
        __metadata("design:type", String)
    ], ActivityModel.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column('text', { nullable: true }),
        __metadata("design:type", String)
    ], ActivityModel.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], ActivityModel.prototype, "pointsEarned", void 0);
    __decorate([
        typeorm_1.Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP(6)' }),
        __metadata("design:type", Date)
    ], ActivityModel.prototype, "timestamp", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], ActivityModel.prototype, "public", void 0);
    ActivityModel = __decorate([
        typeorm_1.Entity('Activities')
    ], ActivityModel);
    return ActivityModel;
})();
exports.ActivityModel = ActivityModel;
