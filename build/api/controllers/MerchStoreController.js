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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.MerchStoreController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const PermissionsService_1 = require("../../services/PermissionsService");
const UserAuthentication_1 = require("../middleware/UserAuthentication");
const AuthenticatedUser_1 = require("../decorators/AuthenticatedUser");
const UserModel_1 = require("../../models/UserModel");
const MerchStoreService_1 = require("../../services/MerchStoreService");
const MerchStoreRequests_1 = require("../validators/MerchStoreRequests");
const Errors_1 = require("../../utils/Errors");
let MerchStoreController = /** @class */ (() => {
    let MerchStoreController = class MerchStoreController {
        getOneMerchCollection(uuid, user) {
            return __awaiter(this, void 0, void 0, function* () {
                const canSeeHiddenItems = PermissionsService_1.default.canEditMerchStore(user);
                const collection = yield this.merchStoreService.findCollectionByUuid(uuid, canSeeHiddenItems);
                return { error: null, collection };
            });
        }
        getAllMerchCollections(user) {
            return __awaiter(this, void 0, void 0, function* () {
                const canSeeInactiveCollections = PermissionsService_1.default.canEditMerchStore(user);
                const collections = yield this.merchStoreService.getAllCollections(canSeeInactiveCollections);
                return { error: null, collections };
            });
        }
        createMerchCollection(createCollectionRequest, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                const collection = yield this.merchStoreService.createCollection(createCollectionRequest);
                return { error: null, collection };
            });
        }
        editMerchCollection(uuid, editCollectionRequest, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                const collection = yield this.merchStoreService.editCollection(uuid, editCollectionRequest);
                return { error: null, collection };
            });
        }
        deleteMerchCollection(uuid, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                yield this.merchStoreService.deleteCollection(uuid);
                return { error: null };
            });
        }
        getOneMerchItem(uuid, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canAccessMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                const item = yield this.merchStoreService.findItemByUuid(uuid);
                return { error: null, item };
            });
        }
        createMerchItem(createItemRequest, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                const item = yield this.merchStoreService.createItem(createItemRequest);
                return { error: null, item };
            });
        }
        editMerchItem(uuid, editItemRequest, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                const item = yield this.merchStoreService.editItem(uuid, editItemRequest);
                return { error: null, item };
            });
        }
        deleteMerchItem(uuid, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canEditMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                yield this.merchStoreService.deleteItem(uuid);
                return { error: null };
            });
        }
        getOneMerchOrder(uuid, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canAccessMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                const order = yield this.merchStoreService.findOrderByUuid(uuid);
                if (!PermissionsService_1.default.canSeeMerchOrder(user, order))
                    throw new routing_controllers_1.NotFoundError();
                return { error: null, order };
            });
        }
        getAllMerchOrders(user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canAccessMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                const canSeeAllOrders = PermissionsService_1.default.canSeeAllMerchOrders(user);
                const orders = yield this.merchStoreService.getAllOrders(user, canSeeAllOrders);
                return { error: null, orders };
            });
        }
        placeMerchOrder(placeOrderRequest, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canAccessMerchStore(user))
                    throw new routing_controllers_1.ForbiddenError();
                const originalOrder = placeOrderRequest.order.filter((oi) => oi.quantity > 0);
                const orderIsEmpty = originalOrder.reduce((x, n) => x + n.quantity, 0) === 0;
                if (orderIsEmpty)
                    throw new Errors_1.UserError('There are no items in this order');
                const numUniqueUuids = (new Set(originalOrder.map((oi) => oi.item))).size;
                if (originalOrder.length !== numUniqueUuids)
                    throw new routing_controllers_1.BadRequestError('There are duplicate items in this order');
                const order = yield this.merchStoreService.placeOrder(originalOrder, user);
                return { error: null, order };
            });
        }
        editMerchOrder(fulfillOrderRequest, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!PermissionsService_1.default.canFulfillMerchOrders(user))
                    throw new routing_controllers_1.ForbiddenError();
                const numUniqueUuids = (new Set(fulfillOrderRequest.items.map((oi) => oi.uuid))).size;
                if (fulfillOrderRequest.items.length !== numUniqueUuids) {
                    throw new routing_controllers_1.BadRequestError('There are duplicate order items');
                }
                yield this.merchStoreService.updateOrderItems(fulfillOrderRequest.items);
                return { error: null };
            });
        }
    };
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", MerchStoreService_1.default)
    ], MerchStoreController.prototype, "merchStoreService", void 0);
    __decorate([
        routing_controllers_1.Get('/collection/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "getOneMerchCollection", null);
    __decorate([
        routing_controllers_1.Get('/collection'),
        __param(0, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "getAllMerchCollections", null);
    __decorate([
        routing_controllers_1.Post('/collection'),
        __param(0, routing_controllers_1.BodyParam('collection')),
        __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MerchStoreRequests_1.CreateMerchCollectionRequest,
            UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "createMerchCollection", null);
    __decorate([
        routing_controllers_1.Patch('/collection/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')),
        __param(1, routing_controllers_1.BodyParam('collection')), __param(2, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, MerchStoreRequests_1.EditMerchCollectionRequest, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "editMerchCollection", null);
    __decorate([
        routing_controllers_1.Delete('/collection/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "deleteMerchCollection", null);
    __decorate([
        routing_controllers_1.Get('/merchandise/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "getOneMerchItem", null);
    __decorate([
        routing_controllers_1.Post('/merchandise'),
        __param(0, routing_controllers_1.BodyParam('merchandise')),
        __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MerchStoreRequests_1.CreateMerchItemRequest,
            UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "createMerchItem", null);
    __decorate([
        routing_controllers_1.Patch('/merchandise/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')),
        __param(1, routing_controllers_1.BodyParam('merchandise')), __param(2, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, MerchStoreRequests_1.EditMerchItemRequest, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "editMerchItem", null);
    __decorate([
        routing_controllers_1.Delete('/merchandise/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "deleteMerchItem", null);
    __decorate([
        routing_controllers_1.Get('/order/:uuid'),
        __param(0, routing_controllers_1.Param('uuid')), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "getOneMerchOrder", null);
    __decorate([
        routing_controllers_1.Get('/order'),
        __param(0, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "getAllMerchOrders", null);
    __decorate([
        routing_controllers_1.Post('/order'),
        __param(0, routing_controllers_1.Body()), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MerchStoreRequests_1.PlaceOrderRequest, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "placeMerchOrder", null);
    __decorate([
        routing_controllers_1.Patch('/order'),
        __param(0, routing_controllers_1.Body()), __param(1, AuthenticatedUser_1.AuthenticatedUser()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MerchStoreRequests_1.FulfillMerchOrderRequest, UserModel_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], MerchStoreController.prototype, "editMerchOrder", null);
    MerchStoreController = __decorate([
        routing_controllers_1.UseBefore(UserAuthentication_1.UserAuthentication),
        routing_controllers_1.JsonController('/store')
    ], MerchStoreController);
    return MerchStoreController;
})();
exports.MerchStoreController = MerchStoreController;
