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
exports.EventModel = void 0;
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const AttendanceModel_1 = require("./AttendanceModel");
let EventModel = /** @class */ (() => {
    let EventModel = class EventModel extends typeorm_1.BaseEntity {
        getPublicEvent(canSeeAttendanceCode = false) {
            const publicEvent = underscore_1.pick(this, [
                'uuid',
                'organization',
                'committee',
                'thumbnail',
                'cover',
                'title',
                'description',
                'location',
                'eventLink',
                'start',
                'end',
                'pointValue',
                'requiresStaff',
                'staffPointBonus',
            ]);
            if (canSeeAttendanceCode)
                publicEvent.attendanceCode = this.attendanceCode;
            return publicEvent;
        }
        isOngoing() {
            const now = new Date();
            return now >= this.start && now <= this.end;
        }
    };
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], EventModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], EventModel.prototype, "uuid", void 0);
    __decorate([
        typeorm_1.Column({ default: 'ACM' }),
        __metadata("design:type", String)
    ], EventModel.prototype, "organization", void 0);
    __decorate([
        typeorm_1.Column({ default: 'ACM' }),
        typeorm_1.Index(),
        __metadata("design:type", String)
    ], EventModel.prototype, "committee", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], EventModel.prototype, "thumbnail", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], EventModel.prototype, "cover", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], EventModel.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], EventModel.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], EventModel.prototype, "location", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], EventModel.prototype, "eventLink", void 0);
    __decorate([
        typeorm_1.Column('timestamptz'),
        __metadata("design:type", Date)
    ], EventModel.prototype, "start", void 0);
    __decorate([
        typeorm_1.Column('timestamptz'),
        __metadata("design:type", Date)
    ], EventModel.prototype, "end", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], EventModel.prototype, "attendanceCode", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], EventModel.prototype, "pointValue", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], EventModel.prototype, "deleted", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], EventModel.prototype, "requiresStaff", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], EventModel.prototype, "staffPointBonus", void 0);
    __decorate([
        typeorm_1.OneToMany((type) => AttendanceModel_1.AttendanceModel, (attendance) => attendance.event, { cascade: true }),
        __metadata("design:type", Array)
    ], EventModel.prototype, "attendances", void 0);
    EventModel = __decorate([
        typeorm_1.Entity('Events'),
        typeorm_1.Index('event_start_end_index', ['start', 'end'])
    ], EventModel);
    return EventModel;
})();
exports.EventModel = EventModel;
