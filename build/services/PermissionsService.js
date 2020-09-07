"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const types_1 = require("../types");
let PermissionsService = /** @class */ (() => {
    let PermissionsService = class PermissionsService {
        static canEditEvents(user) {
            return user.isAdmin();
        }
        static canSeeEventAttendances(user) {
            return user.isAdmin();
        }
        static canCreateMilestones(user) {
            return user.isAdmin();
        }
        static canGrantPointBonuses(user) {
            return user.isAdmin();
        }
        static canEditMerchStore(user) {
            return user.isAdmin();
        }
        static canAccessMerchStore(user) {
            return user.state === types_1.UserState.ACTIVE;
        }
        static canSeeMerchOrder(user, order) {
            return user.isAdmin() || (this.canAccessMerchStore(user) && order.user === user.uuid);
        }
        static canSeeAllMerchOrders(user) {
            return user.isAdmin();
        }
        static canFulfillMerchOrders(user) {
            return user.isAdmin();
        }
    };
    PermissionsService = __decorate([
        typedi_1.Service()
    ], PermissionsService);
    return PermissionsService;
})();
exports.default = PermissionsService;
