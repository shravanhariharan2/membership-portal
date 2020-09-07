"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasMatchingPasswords = exports.IsValidMajor = exports.IsValidPassword = exports.IsValidName = exports.IsValidGraduationYear = void 0;
const class_validator_1 = require("class-validator");
function templatedValidationDecorator(validator, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator,
        });
    };
}
let GraduationYearValidator = /** @class */ (() => {
    let GraduationYearValidator = class GraduationYearValidator {
        validate(graduationYear) {
            const currentYear = new Date().getFullYear();
            return graduationYear >= currentYear && graduationYear <= currentYear + 6;
        }
        defaultMessage() {
            return 'Your graduation year must be within the next 6 years';
        }
    };
    GraduationYearValidator = __decorate([
        class_validator_1.ValidatorConstraint()
    ], GraduationYearValidator);
    return GraduationYearValidator;
})();
function IsValidGraduationYear(validationOptions) {
    return templatedValidationDecorator(GraduationYearValidator, validationOptions);
}
exports.IsValidGraduationYear = IsValidGraduationYear;
let NameValidator = /** @class */ (() => {
    let NameValidator = class NameValidator {
        validate(name) {
            return name.length > 0;
        }
        defaultMessage() {
            return 'Your name cannot be empty';
        }
    };
    NameValidator = __decorate([
        class_validator_1.ValidatorConstraint()
    ], NameValidator);
    return NameValidator;
})();
function IsValidName(validationOptions) {
    return templatedValidationDecorator(NameValidator, validationOptions);
}
exports.IsValidName = IsValidName;
let PasswordValidator = /** @class */ (() => {
    let PasswordValidator = class PasswordValidator {
        constructor() {
            this.MIN_LENGTH = 8;
        }
        validate(password) {
            return password.length > this.MIN_LENGTH;
        }
        defaultMessage() {
            return `Your password must be longer than ${this.MIN_LENGTH} characters`;
        }
    };
    PasswordValidator = __decorate([
        class_validator_1.ValidatorConstraint()
    ], PasswordValidator);
    return PasswordValidator;
})();
function IsValidPassword(validationOptions) {
    return templatedValidationDecorator(PasswordValidator, validationOptions);
}
exports.IsValidPassword = IsValidPassword;
let MajorValidator = /** @class */ (() => {
    let MajorValidator = class MajorValidator {
        validate(major) {
            return major.length >= 2;
        }
        defaultMessage() {
            return 'Your major must be at least 2 characters';
        }
    };
    MajorValidator = __decorate([
        class_validator_1.ValidatorConstraint()
    ], MajorValidator);
    return MajorValidator;
})();
function IsValidMajor(validationOptions) {
    return templatedValidationDecorator(MajorValidator, validationOptions);
}
exports.IsValidMajor = IsValidMajor;
let MatchingPasswordsValidator = /** @class */ (() => {
    let MatchingPasswordsValidator = class MatchingPasswordsValidator {
        validate(passwordChange) {
            return passwordChange.newPassword === passwordChange.confirmPassword;
        }
        defaultMessage() {
            return 'Passwords do not match';
        }
    };
    MatchingPasswordsValidator = __decorate([
        class_validator_1.ValidatorConstraint()
    ], MatchingPasswordsValidator);
    return MatchingPasswordsValidator;
})();
function HasMatchingPasswords(validationOptions) {
    return templatedValidationDecorator(MatchingPasswordsValidator, validationOptions);
}
exports.HasMatchingPasswords = HasMatchingPasswords;
