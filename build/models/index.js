"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const UserModel_1 = require("./UserModel");
const ActivityModel_1 = require("./ActivityModel");
const EventModel_1 = require("./EventModel");
const AttendanceModel_1 = require("./AttendanceModel");
const MerchandiseCollectionModel_1 = require("./MerchandiseCollectionModel");
const MerchandiseItemModel_1 = require("./MerchandiseItemModel");
const OrderModel_1 = require("./OrderModel");
const OrderItemModel_1 = require("./OrderItemModel");
exports.models = [
    UserModel_1.UserModel,
    ActivityModel_1.ActivityModel,
    EventModel_1.EventModel,
    AttendanceModel_1.AttendanceModel,
    MerchandiseCollectionModel_1.MerchandiseCollectionModel,
    MerchandiseItemModel_1.MerchandiseModel,
    OrderModel_1.OrderModel,
    OrderItemModel_1.OrderItemModel,
];
