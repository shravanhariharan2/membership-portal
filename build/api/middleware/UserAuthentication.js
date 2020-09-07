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
exports.OptionalUserAuthentication = exports.UserAuthentication = void 0;
const typedi_1 = require("typedi");
const UserAuthService_1 = require("../../services/UserAuthService");
const AuthActionMetadata_1 = require("../../utils/AuthActionMetadata");
const Logger_1 = require("../../utils/Logger");
let UserAuthentication = /** @class */ (() => {
    class UserAuthentication {
        use(request, response, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const authHeader = request.get('Authorization');
                request.user = yield this.userAuthService.checkAuthToken(authHeader);
                Logger_1.logger.info('user authentication (middleware)', AuthActionMetadata_1.authActionMetadata(request.trace, request.user));
                return next();
            });
        }
    }
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", UserAuthService_1.default)
    ], UserAuthentication.prototype, "userAuthService", void 0);
    return UserAuthentication;
})();
exports.UserAuthentication = UserAuthentication;
let OptionalUserAuthentication = /** @class */ (() => {
    class OptionalUserAuthentication {
        use(request, response, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const authHeader = request.get('Authorization');
                try {
                    request.user = yield this.userAuthService.checkAuthToken(authHeader);
                    Logger_1.logger.info('user authentication (middleware)', AuthActionMetadata_1.authActionMetadata(request.trace, request.user));
                }
                catch (error) {
                    Logger_1.logger.debug('optional user auth (middleware)');
                }
                return next();
            });
        }
    }
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", UserAuthService_1.default)
    ], OptionalUserAuthentication.prototype, "userAuthService", void 0);
    return OptionalUserAuthentication;
})();
exports.OptionalUserAuthentication = OptionalUserAuthentication;
