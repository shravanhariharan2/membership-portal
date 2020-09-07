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
exports.AttendanceModel = void 0;
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const UserModel_1 = require("./UserModel");
const EventModel_1 = require("./EventModel");
let AttendanceModel = /** @class */ (() => {
    let AttendanceModel = class AttendanceModel extends typeorm_1.BaseEntity {
        getPublicAttendance() {
            const rawAttendance = underscore_1.pick(this, [
                'user',
                'event',
                'timestamp',
                'asStaff',
            ]);
            const publicAttendance = Object.assign({}, rawAttendance);
            if (rawAttendance.user)
                publicAttendance.user = rawAttendance.user.getPublicProfile();
            if (rawAttendance.event)
                publicAttendance.event = rawAttendance.event.getPublicEvent();
            return publicAttendance;
        }
    };
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], AttendanceModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], AttendanceModel.prototype, "uuid", void 0);
    __decorate([
        typeorm_1.ManyToOne((type) => UserModel_1.UserModel, (user) => user.attendances, { nullable: false }),
        typeorm_1.JoinColumn({ name: 'user' }),
        typeorm_1.Index('attendances_by_user_index'),
        __metadata("design:type", UserModel_1.UserModel)
    ], AttendanceModel.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne((type) => EventModel_1.EventModel, (event) => event.attendances, { nullable: false }),
        typeorm_1.JoinColumn({ name: 'event' }),
        typeorm_1.Index('attendances_by_event_index'),
        __metadata("design:type", EventModel_1.EventModel)
    ], AttendanceModel.prototype, "event", void 0);
    __decorate([
        typeorm_1.Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP(6)' }),
        __metadata("design:type", Date)
    ], AttendanceModel.prototype, "timestamp", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], AttendanceModel.prototype, "asStaff", void 0);
    AttendanceModel = __decorate([
        typeorm_1.Entity('Attendances')
    ], AttendanceModel);
    return AttendanceModel;
})();
exports.AttendanceModel = AttendanceModel;
