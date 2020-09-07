"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTrace = void 0;
const routing_controllers_1 = require("routing-controllers");
function RequestTrace() {
    return routing_controllers_1.createParamDecorator({
        value: (action) => action.request.trace,
    });
}
exports.RequestTrace = RequestTrace;
