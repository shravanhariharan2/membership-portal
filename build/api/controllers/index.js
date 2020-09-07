"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const UserController_1 = require("./UserController");
const AuthController_1 = require("./AuthController");
const EventController_1 = require("./EventController");
const AttendanceController_1 = require("./AttendanceController");
const AdminController_1 = require("./AdminController");
const MerchStoreController_1 = require("./MerchStoreController");
exports.controllers = [
    AuthController_1.AuthController,
    UserController_1.UserController,
    EventController_1.EventController,
    AttendanceController_1.AttendanceController,
    AdminController_1.AdminController,
    MerchStoreController_1.MerchStoreController,
];
