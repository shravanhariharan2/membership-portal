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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.EventController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const EventService_1 = require("../../services/EventService");
const UserAuthentication_1 = require("../middleware/UserAuthentication");
const AuthenticatedUser_1 = require("../decorators/AuthenticatedUser");
const UserModel_1 = require("../../models/UserModel");
const PermissionsService_1 = require("../../services/PermissionsService");
const StorageService_1 = require("../../services/StorageService");
const types_1 = require("../../types");
const EventControllerRequests_1 = require("../validators/EventControllerRequests");
let EventController = /** @class */ (() => {
    let EventController = class EventController {
        getPastEvents(options, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const canSeeAttendanceCode = !!user && PermissionsService_1.default.canEditEvents(user);
                const events = yield this.eventService.getPastEvents(canSeeAttendanceCode, options.offset, options.limit);
                return { error: null, events };
            });
        }
        getFutureEvents(options, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const canSeeAttendanceCode = !!user && PermissionsService_1.default.canEditEvents(user);
                const events = yield this.eventService.getFutureEvents(canSeeAttendanceCode, options.offset, options.limit);
                return { error: null, events };
            });
        }
        updateEventCover(file, uuid, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditEvents(user))
                    throw new routing_controllers_1.ForbiddenError();
                const cover = yield this.storageService.upload(file, types_1.MediaType.EVENT_COVER, uuid);
                const event = yield this.eventService.updateByUuid(uuid, { cover });
                return { error: null, event };
            });
        }
        getOneEvent(uuid, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const canSeeAttendanceCode = PermissionsService_1.default.canEditEvents(user);
                const event = yield this.eventService.findByUuid(uuid, canSeeAttendanceCode);
                return { error: null, event };
            });
        }
        updateEvent(uuid, patches, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditEvents(user))
                    throw new routing_controllers_1.ForbiddenError();
                const event = yield this.eventService.updateByUuid(uuid, patches);
                return { error: null, event };
            });
        }
        deleteEvent(uuid, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditEvents(user))
                    throw new routing_controllers_1.ForbiddenError();
                yield this.eventService.deleteByUuid(uuid);
                return { error: null };
            });
        }
        getAllEvents(options, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const canSeeAttendanceCode = !!user && PermissionsService_1.default.canEditEvents(user);
                const events = yield this.eventService.getAllEvents(canSeeAttendanceCode, options.offset, options.limit);
                return { error: null, events };
            });
        }
        createEvent(postEventRequest, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditEvents(user))
                    throw new routing_controllers_1.ForbiddenError();
                const event = yield this.eventService.create(postEventRequest);
                return { error: null, event };
            });
        }
    };
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", EventService_1.default)
    ], EventController.prototype, "eventService", void 0);
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", StorageService_1.default)
    ], EventController.prototype, "storageService", void 0);
    __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.OptionalUserAuthentication),
        routing_controllers_1.Get('/past'),
        __param(0, routing_controllers_1.QueryParams()), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [EventControllerRequests_1.EventSearchOptions, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], EventController.prototype, "getPastEvents", null);
    __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.OptionalUserAuthentication),
        routing_controllers_1.Get('/future'),
        __param(0, routing_controllers_1.QueryParams()), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [EventControllerRequests_1.EventSearchOptions, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], EventController.prototype, "getFutureEvents", null);
    __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.Post('/picture/:uuid'),
        __param(0, routing_controllers_1.UploadedFile('image', { options: StorageService_1.default.getFileOptions(types_1.MediaType.BANNER) })),
        __param(1, routing_controllers_1.Param('uuid')),
        __param(2, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], EventController.prototype, "updateEventCover", null);
    __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.Get('/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], EventController.prototype, "getOneEvent", null);
    __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.Patch('/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')),
        __param(1, routing_controllers_1.BodyParam('event')), __param(2, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, EventControllerRequests_1.PatchEventRequest, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], EventController.prototype, "updateEvent", null);
    __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.Delete('/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], EventController.prototype, "deleteEvent", null);
    __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.OptionalUserAuthentication),
        routing_controllers_1.Get(),
        __param(0, routing_controllers_1.QueryParams()), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [EventControllerRequests_1.EventSearchOptions, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], EventController.prototype, "getAllEvents", null);
    __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.Post(),
        __param(0, routing_controllers_1.BodyParam('event')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [EventControllerRequests_1.PostEventRequest, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], EventController.prototype, "createEvent", null);
    EventController = __decorate([
        routing_controllers_1.JsonController('/event')
    ], EventController);
    return EventController;
})();
exports.EventController = EventController;
