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
exports.PatchEventRequest = exports.PostEventRequest = exports.OptionalEventProperties = exports.EventSearchOptions = void 0;
const class_validator_1 = require("class-validator");
let EventSearchOptions = /** @class */ (() => {
    class EventSearchOptions {
    }
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Number)
    ], EventSearchOptions.prototype, "offset", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Number)
    ], EventSearchOptions.prototype, "limit", void 0);
    return EventSearchOptions;
})();
exports.EventSearchOptions = EventSearchOptions;
let OptionalEventProperties = /** @class */ (() => {
    class OptionalEventProperties {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], OptionalEventProperties.prototype, "organization", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], OptionalEventProperties.prototype, "committee", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], OptionalEventProperties.prototype, "thumbnail", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], OptionalEventProperties.prototype, "eventLink", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Boolean)
    ], OptionalEventProperties.prototype, "requiresStaff", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Number)
    ], OptionalEventProperties.prototype, "staffPointBonus", void 0);
    return OptionalEventProperties;
})();
exports.OptionalEventProperties = OptionalEventProperties;
let PostEventRequest = /** @class */ (() => {
    class PostEventRequest extends OptionalEventProperties {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PostEventRequest.prototype, "cover", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PostEventRequest.prototype, "title", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PostEventRequest.prototype, "description", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PostEventRequest.prototype, "location", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsDateString(),
        __metadata("design:type", Date)
    ], PostEventRequest.prototype, "start", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsDateString(),
        __metadata("design:type", Date)
    ], PostEventRequest.prototype, "end", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PostEventRequest.prototype, "attendanceCode", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        __metadata("design:type", Number)
    ], PostEventRequest.prototype, "pointValue", void 0);
    return PostEventRequest;
})();
exports.PostEventRequest = PostEventRequest;
let PatchEventRequest = /** @class */ (() => {
    class PatchEventRequest extends OptionalEventProperties {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PatchEventRequest.prototype, "cover", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PatchEventRequest.prototype, "title", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PatchEventRequest.prototype, "description", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PatchEventRequest.prototype, "location", void 0);
    __decorate([
        class_validator_1.IsDateString(),
        __metadata("design:type", Date)
    ], PatchEventRequest.prototype, "start", void 0);
    __decorate([
        class_validator_1.IsDateString(),
        __metadata("design:type", Date)
    ], PatchEventRequest.prototype, "end", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PatchEventRequest.prototype, "attendanceCode", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Number)
    ], PatchEventRequest.prototype, "pointValue", void 0);
    return PatchEventRequest;
})();
exports.PatchEventRequest = PatchEventRequest;
