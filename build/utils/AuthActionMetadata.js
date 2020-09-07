"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authActionMetadata = void 0;
function authActionMetadata(trace_id, user) {
    return {
        trace_id,
        user_uuid: user.uuid,
    };
}
exports.authActionMetadata = authActionMetadata;
