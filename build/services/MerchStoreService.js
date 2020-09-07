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
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const moment = require("moment");
const types_1 = require("../types");
const MerchandiseItemModel_1 = require("../models/MerchandiseItemModel");
const OrderModel_1 = require("../models/OrderModel");
const repositories_1 = require("../repositories");
const MerchandiseCollectionModel_1 = require("../models/MerchandiseCollectionModel");
const EmailService_1 = require("./EmailService");
const Errors_1 = require("../utils/Errors");
let MerchStoreService = /** @class */ (() => {
    var MerchStoreService_1;
    let MerchStoreService = MerchStoreService_1 = class MerchStoreService {
        findCollectionByUuid(uuid, canSeeSeeHiddenItems = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const collection = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchCollectionRepository = repositories_1.default.merchStoreCollection(txn);
                    return merchCollectionRepository.findByUuid(uuid);
                }));
                if (!collection)
                    throw new routing_controllers_1.NotFoundError();
                if (collection.archived && !canSeeSeeHiddenItems)
                    throw new routing_controllers_1.ForbiddenError();
                return canSeeSeeHiddenItems ? collection.getPublicMerchCollection() : collection;
            });
        }
        getAllCollections(canSeeInactiveCollections = false) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchCollectionRepository = repositories_1.default.merchStoreCollection(txn);
                    if (canSeeInactiveCollections) {
                        const collections = yield merchCollectionRepository.getAllCollections();
                        return collections.map((c) => c.getPublicMerchCollection());
                    }
                    return merchCollectionRepository.getAllActiveCollections();
                }));
            });
        }
        createCollection(createCollectionRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchCollectionRepository = repositories_1.default.merchStoreCollection(txn);
                    const collection = MerchandiseCollectionModel_1.MerchandiseCollectionModel.create(createCollectionRequest);
                    return merchCollectionRepository.upsertMerchCollection(collection);
                }));
            });
        }
        editCollection(uuid, changes) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchCollectionRepository = repositories_1.default.merchStoreCollection(txn);
                    const currentCollection = yield merchCollectionRepository.findByUuid(uuid);
                    if (!currentCollection)
                        throw new routing_controllers_1.NotFoundError();
                    let updatedCollection = yield merchCollectionRepository.upsertMerchCollection(currentCollection, changes);
                    if (changes.discountPercentage) {
                        const { discountPercentage } = changes;
                        const merchItemRepository = repositories_1.default.merchStoreItem(txn);
                        yield merchItemRepository.updateMerchItemsInCollection(uuid, discountPercentage);
                        updatedCollection = yield merchCollectionRepository.findByUuid(uuid);
                    }
                    return updatedCollection;
                }));
            });
        }
        deleteCollection(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchCollectionRepository = repositories_1.default.merchStoreCollection(txn);
                    const collection = yield merchCollectionRepository.findByUuid(uuid);
                    if (!collection)
                        throw new routing_controllers_1.NotFoundError();
                    const orderItemRepository = repositories_1.default.merchOrderItem(txn);
                    const hasBeenOrderedFrom = yield orderItemRepository.hasCollectionBeenOrderedFrom(uuid);
                    if (hasBeenOrderedFrom)
                        throw new Errors_1.UserError('This collection has been ordered from');
                    return merchCollectionRepository.deleteMerchCollection(collection);
                }));
            });
        }
        findItemByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                const item = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchItemRepository = repositories_1.default.merchStoreItem(txn);
                    return merchItemRepository.findByUuid(uuid);
                }));
                if (!item)
                    throw new routing_controllers_1.NotFoundError();
                return item.getPublicMerchItem();
            });
        }
        createItem(createItemRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchCollectionRepository = repositories_1.default.merchStoreCollection(txn);
                    const collection = yield merchCollectionRepository.findByUuid(createItemRequest.collection);
                    if (!collection)
                        throw new routing_controllers_1.NotFoundError();
                    const merchItemRepository = repositories_1.default.merchStoreItem(txn);
                    const item = MerchandiseItemModel_1.MerchandiseModel.create(Object.assign(Object.assign({}, createItemRequest), { collection }));
                    return merchItemRepository.upsertMerchItem(item);
                }));
            });
        }
        editItem(uuid, editItemRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                const updatedItem = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchItemRepository = repositories_1.default.merchStoreItem(txn);
                    const item = yield merchItemRepository.findByUuid(uuid);
                    if (!item)
                        throw new routing_controllers_1.NotFoundError();
                    const changes = Object.assign(Object.assign({}, editItemRequest), { collection: item.collection });
                    if (changes.collection) {
                        const merchCollectionRepository = repositories_1.default.merchStoreCollection(txn);
                        const collection = yield merchCollectionRepository.findByUuid(editItemRequest.collection);
                        if (!collection)
                            throw new routing_controllers_1.NotFoundError('Collection not found');
                        changes.collection = collection;
                    }
                    // 'quantity' is incremented instead of directly set to avoid concurrency issues with orders
                    // e.g. there's 10 of an item and someone adds 5 to stock while someone else orders 1
                    // so the merch store admin sets quantity to 15 but the true quantity is 14
                    if (changes.quantity)
                        changes.quantity += item.quantity;
                    return merchItemRepository.upsertMerchItem(item, changes);
                }));
                delete updatedItem.collection.items;
                return updatedItem;
            });
        }
        deleteItem(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchItemRepository = repositories_1.default.merchStoreItem(txn);
                    const item = yield merchItemRepository.findByUuid(uuid);
                    if (!item)
                        throw new routing_controllers_1.NotFoundError();
                    const hasBeenOrdered = yield repositories_1.default.merchOrderItem(txn).hasItemBeenOrdered(uuid);
                    if (hasBeenOrdered)
                        throw new Errors_1.UserError('This item has been ordered already');
                    return merchItemRepository.deleteMerchItem(item);
                }));
            });
        }
        findOrderByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                const order = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchOrderRepository = repositories_1.default.merchOrder(txn);
                    return merchOrderRepository.findByUuid(uuid);
                }));
                if (!order)
                    throw new routing_controllers_1.NotFoundError();
                return order.getPublicOrder();
            });
        }
        getAllOrders(user, canSeeAllOrders = false) {
            return __awaiter(this, void 0, void 0, function* () {
                const orders = yield this.entityManager.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchOrderRepository = repositories_1.default.merchOrder(txn);
                    if (canSeeAllOrders) {
                        return merchOrderRepository.getAllOrdersForAllUsers();
                    }
                    return merchOrderRepository.getAllOrdersForUser(user);
                }));
                return orders.map((o) => o.getPublicOrder());
            });
        }
        placeOrder(originalOrder, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const [order, merchItems] = yield this.entityManager.transaction('SERIALIZABLE', (txn) => __awaiter(this, void 0, void 0, function* () {
                    const merchItemRepository = repositories_1.default.merchStoreItem(txn);
                    const items = yield merchItemRepository.batchFindByUuid(originalOrder.map((oi) => oi.item));
                    if (items.size !== originalOrder.length) {
                        const requestedItems = originalOrder.map((oi) => oi.item);
                        const foundItems = Array.from(items.values())
                            .filter((i) => !i.hidden)
                            .map((i) => i.uuid);
                        const missingItems = underscore_1.difference(requestedItems, foundItems);
                        throw new routing_controllers_1.NotFoundError(`Missing: ${missingItems}`);
                    }
                    // checks that the user hasn't exceeded monthly/lifetime purchase limits
                    const merchOrderRepository = repositories_1.default.merchOrder(txn);
                    const lifetimePurchaseHistory = yield merchOrderRepository.getAllOrdersForUser(user);
                    const oneMonthAgo = new Date(moment().subtract('months', 1).unix());
                    const pastMonthPurchaseHistory = lifetimePurchaseHistory.filter((o) => o.orderedAt > oneMonthAgo);
                    const lifetimeOrderItemCounts = MerchStoreService_1
                        .countOrderItems(Array.from(items.values()), lifetimePurchaseHistory);
                    const pastMonthOrderItemCounts = MerchStoreService_1
                        .countOrderItems(Array.from(items.values()), pastMonthPurchaseHistory);
                    for (let i = 0; i < originalOrder.length; i += 1) {
                        const item = items.get(originalOrder[i].item);
                        const quantityRequested = originalOrder[i].quantity;
                        if (!!item.lifetimeLimit && lifetimeOrderItemCounts[item.uuid] + quantityRequested > item.lifetimeLimit) {
                            throw new Errors_1.UserError(`This order exceeds the lifetime limit for ${item.itemName}`);
                        }
                        if (!!item.monthlyLimit && pastMonthOrderItemCounts[item.uuid] + quantityRequested > item.monthlyLimit) {
                            throw new Errors_1.UserError(`This order exceeds the monthly limit for ${item.itemName}`);
                        }
                    }
                    // checks that enough units of requested items are in stock
                    for (let i = 0; i < originalOrder.length; i += 1) {
                        const item = items.get(originalOrder[i].item);
                        const quantityRequested = originalOrder[i].quantity;
                        if (item.quantity < quantityRequested) {
                            throw new Errors_1.UserError(`There aren't enough units of ${item.itemName} in stock`);
                        }
                    }
                    // checks that the user has enough credits to place order
                    const totalCost = originalOrder.reduce((sum, i) => {
                        const item = items.get(i.item);
                        const quantityRequested = i.quantity;
                        return sum + (item.getPrice() * quantityRequested);
                    }, 0);
                    yield user.reload();
                    if (user.credits < totalCost)
                        throw new Errors_1.UserError('You don\'t have enough credits');
                    // if all checks pass, the order is placed
                    const createdOrder = yield merchOrderRepository.createMerchOrder(OrderModel_1.OrderModel.create({
                        user,
                        totalCost,
                        items: underscore_1.flatten(originalOrder.map((oi) => {
                            const item = items.get(oi.item);
                            const quantityRequested = oi.quantity;
                            return Array(quantityRequested).fill({
                                item,
                                salePriceAtPurchase: item.getPrice(),
                                discountPercentageAtPurchase: item.discountPercentage,
                            });
                        })),
                    }));
                    const activityRepository = repositories_1.default.activity(txn);
                    yield activityRepository.logActivity(user, types_1.ActivityType.ORDER_MERCHANDISE, 0, `Order ${createdOrder.uuid}`);
                    yield Promise.all(originalOrder.map((oi) => {
                        const item = items.get(oi.item);
                        return merchItemRepository.upsertMerchItem(item, { quantity: item.quantity - oi.quantity });
                    }));
                    const userRepository = repositories_1.default.user(txn);
                    userRepository.upsertUser(user, { credits: user.credits - totalCost });
                    return [createdOrder, items];
                }));
                const orderConfirmation = {
                    items: originalOrder.map((oi) => {
                        const item = merchItems.get(oi.item);
                        return Object.assign(Object.assign({}, item), { quantityRequested: oi.quantity, salePrice: item.getPrice(), total: oi.quantity * item.getPrice() });
                    }),
                    totalCost: order.totalCost,
                };
                this.emailService.sendOrderConfirmation(user.email, user.firstName, orderConfirmation);
                return order.getPublicOrder();
            });
        }
        updateOrderItems(fulfillmentUpdates) {
            return __awaiter(this, void 0, void 0, function* () {
                const updates = new Map();
                for (let i = 0; i < fulfillmentUpdates.length; i += 1) {
                    const oi = fulfillmentUpdates[i];
                    oi.fulfilled = Boolean(oi.fulfilled);
                    updates.set(oi.uuid, oi);
                }
                yield this.entityManager.transaction('SERIALIZABLE', (txn) => __awaiter(this, void 0, void 0, function* () {
                    const orderItemRepository = repositories_1.default.merchOrderItem(txn);
                    const orderItems = yield orderItemRepository.batchFindByUuid(Array.from(fulfillmentUpdates.map((oi) => oi.uuid)));
                    if (orderItems.size !== fulfillmentUpdates.length) {
                        throw new routing_controllers_1.NotFoundError('Missing some order items');
                    }
                    const toBeFulfilled = fulfillmentUpdates
                        .filter((oi) => oi.fulfilled)
                        .map((oi) => oi.uuid);
                    const alreadyFulfilled = Array.from(orderItems.values())
                        .filter((oi) => oi.fulfilled)
                        .map((oi) => oi.uuid);
                    if (underscore_1.intersection(toBeFulfilled, alreadyFulfilled).length > 0) {
                        throw new Errors_1.UserError('At least one order item marked to be fulfilled has already been fulfilled');
                    }
                    yield Promise.all(Array.from(orderItems.values()).map((oi) => {
                        const { fulfilled, notes } = updates.get(oi.uuid);
                        return orderItemRepository.fulfillOrderItem(oi, fulfilled, notes);
                    }));
                }));
            });
        }
        static countOrderItems(items, orders) {
            const counts = new Map();
            for (let i = 0; i < items.length; i += 1) {
                counts.set(items[i].uuid, 0);
            }
            const orderedItems = underscore_1.flatten(orders.map((o) => o.items));
            for (let i = 0; i < orderedItems.length; i += 1) {
                const oi = orderedItems[i].item.uuid;
                if (counts.has(oi))
                    counts.set(oi, counts.get(oi) + 1);
            }
            return counts;
        }
    };
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", EmailService_1.default)
    ], MerchStoreService.prototype, "emailService", void 0);
    __decorate([
        typeorm_typedi_extensions_1.InjectManager(),
        __metadata("design:type", typeorm_1.EntityManager)
    ], MerchStoreService.prototype, "entityManager", void 0);
    MerchStoreService = MerchStoreService_1 = __decorate([
        typedi_1.Service()
    ], MerchStoreService);
    return MerchStoreService;
})();
exports.default = MerchStoreService;
