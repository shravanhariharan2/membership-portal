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
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const Errors_1 = require("../utils/Errors");
const repositories_1 = require("../repositories");
let AttendanceService = /** @class */ (() => {
    let AttendanceService = class AttendanceService {
        getAttendancesForEvent(event) {
            return __awaiter(this, void 0, void 0, function* () {
                const attendances = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const attendanceRepository = repositories_1.default.attendance(txn);
                    return attendanceRepository.getAttendancesForEvent(event);
                }));
                return attendances.map((attendance) => attendance.getPublicAttendance());
            });
        }
        getAttendancesForUser(user) {
            return __awaiter(this, void 0, void 0, function* () {
                const attendances = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const attendanceRepository = repositories_1.default.attendance(txn);
                    return attendanceRepository.getAttendancesForUser(user);
                }));
                return attendances.map((attendance) => attendance.getPublicAttendance());
            });
        }
        attendEvent(user, attendanceCode, asStaff = false) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const eventRepository = repositories_1.default.event(txn);
                    const event = yield eventRepository.findByAttendanceCode(attendanceCode);
                    if (!event)
                        throw new routing_controllers_1.NotFoundError('Oh no! That code didn\'nt work.');
                    if (!event.isOngoing())
                        throw new Errors_1.UserError('You can only enter the attendance code during the event!');
                    const attendanceRepository = repositories_1.default.attendance(txn);
                    const hasAlreadyAttended = yield attendanceRepository.hasUserAttendedEvent(user, event);
                    if (hasAlreadyAttended)
                        throw new Errors_1.UserError('You have already attended this event');
                    const attendedAsStaff = asStaff && user.isStaff() && event.requiresStaff;
                    const pointsEarned = attendedAsStaff ? event.pointValue + event.staffPointBonus : event.pointValue;
                    const activityRepository = repositories_1.default.activity(txn);
                    yield activityRepository.logActivity(user, types_1.ActivityType.ATTEND_EVENT_AS_STAFF, pointsEarned);
                    const userRepository = repositories_1.default.user(txn);
                    yield userRepository.addPoints(user, pointsEarned);
                    const attendance = yield attendanceRepository.attendEvent(user, event, attendedAsStaff);
                    return attendance.getPublicAttendance();
                }));
            });
        }
    };
    __decorate([
        typeorm_typedi_extensions_1.InjectManager(),
        __metadata("design:type", typeorm_1.EntityManager)
    ], AttendanceService.prototype, "entityManager", void 0);
    AttendanceService = __decorate([
        typedi_1.Service()
    ], AttendanceService);
    return AttendanceService;
})();
exports.default = AttendanceService;
