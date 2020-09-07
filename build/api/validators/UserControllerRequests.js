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
exports.PatchUserRequest = exports.PasswordUpdate = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Validators_1 = require("../decorators/Validators");
const AuthControllerRequests_1 = require("./AuthControllerRequests");
let PasswordUpdate = /** @class */ (() => {
    class PasswordUpdate extends AuthControllerRequests_1.PasswordChange {
    }
    __decorate([
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], PasswordUpdate.prototype, "password", void 0);
    return PasswordUpdate;
})();
exports.PasswordUpdate = PasswordUpdate;
let PatchUserRequest = /** @class */ (() => {
    class PatchUserRequest {
    }
    __decorate([
        Validators_1.IsValidName(),
        __metadata("design:type", String)
    ], PatchUserRequest.prototype, "firstName", void 0);
    __decorate([
        Validators_1.IsValidName(),
        __metadata("design:type", String)
    ], PatchUserRequest.prototype, "lastName", void 0);
    __decorate([
        Validators_1.IsValidMajor(),
        __metadata("design:type", String)
    ], PatchUserRequest.prototype, "major", void 0);
    __decorate([
        Validators_1.IsValidGraduationYear(),
        __metadata("design:type", Number)
    ], PatchUserRequest.prototype, "graduationYear", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], PatchUserRequest.prototype, "bio", void 0);
    __decorate([
        class_transformer_1.Type(() => PasswordUpdate),
        Validators_1.HasMatchingPasswords(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", PasswordUpdate)
    ], PatchUserRequest.prototype, "passwordChange", void 0);
    return PatchUserRequest;
})();
exports.PatchUserRequest = PatchUserRequest;
