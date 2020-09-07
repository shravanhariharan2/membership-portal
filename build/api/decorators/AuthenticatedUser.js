"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUser = void 0;
const routing_controllers_1 = require("routing-controllers");
function AuthenticatedUser() {
    return routing_controllers_1.createParamDecorator({
        value: (action) => action.request.user,
    });
}
exports.AuthenticatedUser = AuthenticatedUser;
