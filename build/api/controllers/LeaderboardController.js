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
exports.LeaderboardController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UserAuthentication_1 = require("../middleware/UserAuthentication");
const UserAccountService_1 = require("../../services/UserAccountService");
let LeaderboardController = /** @class */ (() => {
    let LeaderboardController = class LeaderboardController {
        getLeaderboard() {
            return __awaiter(this, void 0, void 0, function* () {
                const leaderboard = yield this.userAccountService.getLeaderboard();
                return { error: null, leaderboard };
            });
        }
    };
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", UserAccountService_1.default)
    ], LeaderboardController.prototype, "userAccountService", void 0);
    __decorate([
        routing_controllers_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], LeaderboardController.prototype, "getLeaderboard", null);
    LeaderboardController = __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.JsonController('/leaderboard')
    ], LeaderboardController);
    return LeaderboardController;
})();
exports.LeaderboardController = LeaderboardController;
