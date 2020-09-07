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
const EventModel_1 = require("../models/EventModel");
const repositories_1 = require("../repositories");
const Errors_1 = require("../utils/Errors");
let EventService = /** @class */ (() => {
    let EventService = class EventService {
        create(postEventRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                const event = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const eventRepository = repositories_1.default.event(txn);
                    const isUnusedAttendanceCode = eventRepository.isUnusedAttendanceCode(postEventRequest.attendanceCode);
                    if (!isUnusedAttendanceCode)
                        throw new Errors_1.UserError('Attendance code has already been used');
                    return eventRepository.upsertEvent(EventModel_1.EventModel.create(postEventRequest));
                }));
                return event.getPublicEvent();
            });
        }
        getAllEvents(canSeeAttendanceCode = false, offset = 0, limit = 0) {
            return __awaiter(this, void 0, void 0, function* () {
                const events = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const eventRepository = repositories_1.default.event(txn);
                    return eventRepository.getAllEvents(offset, limit);
                }));
                return events.map((e) => e.getPublicEvent(canSeeAttendanceCode));
            });
        }
        getPastEvents(canSeeAttendanceCode = false, offset = 0, limit = 0) {
            return __awaiter(this, void 0, void 0, function* () {
                const events = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const eventRepository = repositories_1.default.event(txn);
                    return eventRepository.getPastEvents(offset, limit);
                }));
                return events.map((e) => e.getPublicEvent(canSeeAttendanceCode));
            });
        }
        getFutureEvents(canSeeAttendanceCode = false, offset = 0, limit = 0) {
            return __awaiter(this, void 0, void 0, function* () {
                const events = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const eventRepository = repositories_1.default.event(txn);
                    return eventRepository.getFutureEvents(offset, limit);
                }));
                return events.map((e) => e.getPublicEvent(canSeeAttendanceCode));
            });
        }
        findByUuid(uuid, canSeeAttendanceCode = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const event = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const eventRepository = repositories_1.default.event(txn);
                    return eventRepository.findByUuid(uuid);
                }));
                if (!event)
                    throw new routing_controllers_1.NotFoundError('Event not found');
                return event.getPublicEvent(canSeeAttendanceCode);
            });
        }
        updateByUuid(uuid, changes) {
            return __awaiter(this, void 0, void 0, function* () {
                const updatedEvent = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const eventRepository = repositories_1.default.event(txn);
                    const currentEvent = yield eventRepository.findByUuid(uuid);
                    if (!currentEvent)
                        throw new routing_controllers_1.NotFoundError();
                    return eventRepository.upsertEvent(currentEvent, changes);
                }));
                return updatedEvent.getPublicEvent(true);
            });
        }
        deleteByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const eventRepository = repositories_1.default.event(txn);
                    const event = yield eventRepository.findByUuid(uuid);
                    if (!event)
                        throw new routing_controllers_1.NotFoundError();
                    yield eventRepository.deleteEvent(event);
                }));
            });
        }
    };
    __decorate([
        typeorm_typedi_extensions_1.InjectManager(),
        __metadata("design:type", typeorm_1.EntityManager)
    ], EventService.prototype, "entityManager", void 0);
    EventService = __decorate([
        typedi_1.Service()
    ], EventService);
    return EventService;
})();
exports.default = EventService;
