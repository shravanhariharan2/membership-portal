"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.OrderItemRepository = exports.MerchOrderRepository = void 0;
const typeorm_1 = require("typeorm");
const OrderModel_1 = require("../models/OrderModel");
const OrderItemModel_1 = require("../models/OrderItemModel");
const BaseRepository_1 = require("./BaseRepository");
let MerchOrderRepository = /** @class */ (() => {
    let MerchOrderRepository = class MerchOrderRepository extends BaseRepository_1.BaseRepository {
        createMerchOrder(order) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.save(order);
            });
        }
        findByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.findOne(uuid);
            });
        }
        getAllOrdersForAllUsers() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find();
            });
        }
        getAllOrdersForUser(user) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({ user });
            });
        }
    };
    MerchOrderRepository = __decorate([
        typeorm_1.EntityRepository(OrderModel_1.OrderModel)
    ], MerchOrderRepository);
    return MerchOrderRepository;
})();
exports.MerchOrderRepository = MerchOrderRepository;
let OrderItemRepository = /** @class */ (() => {
    let OrderItemRepository = class OrderItemRepository extends BaseRepository_1.BaseRepository {
        batchFindByUuid(uuids) {
            return __awaiter(this, void 0, void 0, function* () {
                const items = yield this.repository.findByIds(uuids);
                return new Map(items.map((i) => [i.uuid, i]));
            });
        }
        fulfillOrderItem(orderItem, fulfilled, notes) {
            return __awaiter(this, void 0, void 0, function* () {
                if (fulfilled) {
                    orderItem.fulfilled = true;
                    orderItem.fulfilledAt = new Date();
                }
                if (notes)
                    orderItem.notes = notes;
                return this.repository.save(orderItem);
            });
        }
        hasCollectionBeenOrderedFrom(collection) {
            return __awaiter(this, void 0, void 0, function* () {
                const count = yield this.repository.createQueryBuilder('item')
                    .innerJoinAndSelect('item.item', 'merch')
                    .where('merch.collection = :collection', { collection })
                    .getCount();
                return count > 0;
            });
        }
        hasItemBeenOrdered(item) {
            return __awaiter(this, void 0, void 0, function* () {
                const count = yield this.repository.count({ where: { item } });
                return count > 0;
            });
        }
    };
    OrderItemRepository = __decorate([
        typeorm_1.EntityRepository(OrderItemModel_1.OrderItemModel)
    ], OrderItemRepository);
    return OrderItemRepository;
})();
exports.OrderItemRepository = OrderItemRepository;
