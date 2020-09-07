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
exports.PasswordResetRequest = exports.LoginRequest = exports.RegistrationRequest = exports.PasswordChange = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Validators_1 = require("../decorators/Validators");
let PasswordChange = /** @class */ (() => {
    class PasswordChange {
    }
    __decorate([
        class_validator_1.IsDefined(),
        Validators_1.IsValidPassword(),
        __metadata("design:type", String)
    ], PasswordChange.prototype, "newPassword", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], PasswordChange.prototype, "confirmPassword", void 0);
    return PasswordChange;
})();
exports.PasswordChange = PasswordChange;
let RegistrationRequest = /** @class */ (() => {
    class RegistrationRequest {
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], RegistrationRequest.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        Validators_1.IsValidName(),
        __metadata("design:type", String)
    ], RegistrationRequest.prototype, "firstName", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        Validators_1.IsValidName(),
        __metadata("design:type", String)
    ], RegistrationRequest.prototype, "lastName", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        Validators_1.IsValidPassword(),
        __metadata("design:type", String)
    ], RegistrationRequest.prototype, "password", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        Validators_1.IsValidGraduationYear(),
        __metadata("design:type", Number)
    ], RegistrationRequest.prototype, "graduationYear", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        Validators_1.IsValidMajor(),
        __metadata("design:type", String)
    ], RegistrationRequest.prototype, "major", void 0);
    return RegistrationRequest;
})();
exports.RegistrationRequest = RegistrationRequest;
let LoginRequest = /** @class */ (() => {
    class LoginRequest {
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], LoginRequest.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], LoginRequest.prototype, "password", void 0);
    return LoginRequest;
})();
exports.LoginRequest = LoginRequest;
let PasswordResetRequest = /** @class */ (() => {
    class PasswordResetRequest {
    }
    __decorate([
        class_transformer_1.Type(() => PasswordChange),
        class_validator_1.IsDefined(),
        class_validator_1.ValidateNested(),
        Validators_1.HasMatchingPasswords(),
        __metadata("design:type", PasswordChange)
    ], PasswordResetRequest.prototype, "user", void 0);
    return PasswordResetRequest;
})();
exports.PasswordResetRequest = PasswordResetRequest;
