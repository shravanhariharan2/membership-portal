"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
const routing_controllers_1 = require("routing-controllers");
class UserError extends routing_controllers_1.HttpError {
    constructor(message) {
        super(400);
        this.message = message;
    }
    toJson() {
        return {
            status: this.httpCode,
            message: this.message,
        };
    }
}
exports.UserError = UserError;
