"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityType = exports.MediaType = exports.UserState = exports.UserAccessType = void 0;
var UserAccessType;
(function (UserAccessType) {
    UserAccessType["RESTRICTED"] = "RESTRICTED";
    UserAccessType["STANDARD"] = "STANDARD";
    UserAccessType["STAFF"] = "STAFF";
    UserAccessType["ADMIN"] = "ADMIN";
})(UserAccessType = exports.UserAccessType || (exports.UserAccessType = {}));
var UserState;
(function (UserState) {
    UserState["PENDING"] = "PENDING";
    UserState["ACTIVE"] = "ACTIVE";
    UserState["BLOCKED"] = "BLOCKED";
    UserState["PASSWORD_RESET"] = "PASSWORD_RESET";
})(UserState = exports.UserState || (exports.UserState = {}));
var MediaType;
(function (MediaType) {
    MediaType["EVENT_COVER"] = "EVENT_COVER";
    MediaType["PROFILE_PICTURE"] = "PROFILE_PICTURE";
    MediaType["BANNER"] = "BANNER";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var ActivityType;
(function (ActivityType) {
    ActivityType["ACCOUNT_CREATE"] = "ACCOUNT_CREATE";
    ActivityType["ACCOUNT_ACTIVATE"] = "ACCOUNT_ACTIVATE";
    ActivityType["ACCOUNT_RESET_PASS"] = "ACCOUNT_RESET_PASS";
    ActivityType["ACCOUNT_RESET_PASS_REQUEST"] = "ACCOUNT_RESET_PASS_REQUEST";
    ActivityType["ACCOUNT_UPDATE_INFO"] = "ACCOUNT_UPDATE_INFO";
    ActivityType["ACCOUNT_LOGIN"] = "ACCOUNT_LOGIN";
    ActivityType["ATTEND_EVENT"] = "ATTEND_EVENT";
    ActivityType["ATTEND_EVENT_AS_STAFF"] = "ATTEND_EVENT_AS_STAFF";
    ActivityType["BONUS_POINTS"] = "BONUS_POINTS";
    ActivityType["MILESTONE"] = "MILESTONE";
    ActivityType["ORDER_MERCHANDISE"] = "ORDER_MERCHANDISE";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
