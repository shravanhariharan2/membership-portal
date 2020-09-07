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
exports.EventRepository = void 0;
const typeorm_1 = require("typeorm");
const EventModel_1 = require("../models/EventModel");
const BaseRepository_1 = require("./BaseRepository");
let EventRepository = /** @class */ (() => {
    let EventRepository = class EventRepository extends BaseRepository_1.BaseRepository {
        upsertEvent(event, changes) {
            return __awaiter(this, void 0, void 0, function* () {
                if (changes)
                    event = EventModel_1.EventModel.merge(event, changes);
                return this.repository.save(event);
            });
        }
        getAllEvents(offset, limit) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({
                    skip: offset,
                    take: limit,
                    order: { start: 'ASC' },
                });
            });
        }
        getPastEvents(offset = 0, limit = 0) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({
                    skip: offset,
                    take: limit,
                    where: { end: typeorm_1.LessThan(new Date()) },
                    order: { start: 'ASC' },
                });
            });
        }
        getFutureEvents(offset = 0, limit = 0) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({
                    skip: offset,
                    take: limit,
                    where: { end: typeorm_1.MoreThanOrEqual(new Date()) },
                    order: { start: 'ASC' },
                });
            });
        }
        getEventsByCommittee(committee, offset = 0, limit = 100) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({
                    skip: offset,
                    take: limit,
                    where: { committee },
                    order: { start: 'ASC' },
                });
            });
        }
        findByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.findOne({ uuid });
            });
        }
        findByAttendanceCode(attendanceCode) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.findOne({ attendanceCode });
            });
        }
        deleteEvent(event) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.remove(event);
            });
        }
        isUnusedAttendanceCode(attendanceCode) {
            return __awaiter(this, void 0, void 0, function* () {
                const count = yield this.repository.count({ attendanceCode });
                return count === 0;
            });
        }
    };
    EventRepository = __decorate([
        typeorm_1.EntityRepository(EventModel_1.EventModel)
    ], EventRepository);
    return EventRepository;
})();
exports.EventRepository = EventRepository;
