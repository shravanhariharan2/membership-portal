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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulfillMerchOrderRequest = exports.OrderItemFulfillmentUpdate = exports.PlaceOrderRequest = exports.MerchItemAndQuantity = exports.EditMerchItemRequest = exports.CreateMerchItemRequest = exports.EditMerchCollectionRequest = exports.CreateMerchCollectionRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let CreateMerchCollectionRequest = /** @class */ (() => {
    class CreateMerchCollectionRequest {
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], CreateMerchCollectionRequest.prototype, "title", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], CreateMerchCollectionRequest.prototype, "description", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Boolean)
    ], CreateMerchCollectionRequest.prototype, "archived", void 0);
    return CreateMerchCollectionRequest;
})();
exports.CreateMerchCollectionRequest = CreateMerchCollectionRequest;
let EditMerchCollectionRequest = /** @class */ (() => {
    class EditMerchCollectionRequest {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], EditMerchCollectionRequest.prototype, "title", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], EditMerchCollectionRequest.prototype, "description", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Boolean)
    ], EditMerchCollectionRequest.prototype, "archived", void 0);
    __decorate([
        class_validator_1.Min(0),
        class_validator_1.Max(100),
        __metadata("design:type", Number)
    ], EditMerchCollectionRequest.prototype, "discountPercentage", void 0);
    return EditMerchCollectionRequest;
})();
exports.EditMerchCollectionRequest = EditMerchCollectionRequest;
let CreateMerchItemRequest = /** @class */ (() => {
    class CreateMerchItemRequest {
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], CreateMerchItemRequest.prototype, "itemName", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], CreateMerchItemRequest.prototype, "collection", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.Min(0),
        __metadata("design:type", Number)
    ], CreateMerchItemRequest.prototype, "price", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], CreateMerchItemRequest.prototype, "description", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", String)
    ], CreateMerchItemRequest.prototype, "picture", void 0);
    __decorate([
        class_validator_1.Min(0),
        __metadata("design:type", Number)
    ], CreateMerchItemRequest.prototype, "quantity", void 0);
    __decorate([
        class_validator_1.Min(0),
        class_validator_1.Max(100),
        __metadata("design:type", Number)
    ], CreateMerchItemRequest.prototype, "discountPercentage", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Boolean)
    ], CreateMerchItemRequest.prototype, "hidden", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Object)
    ], CreateMerchItemRequest.prototype, "metadata", void 0);
    return CreateMerchItemRequest;
})();
exports.CreateMerchItemRequest = CreateMerchItemRequest;
let EditMerchItemRequest = /** @class */ (() => {
    class EditMerchItemRequest {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], EditMerchItemRequest.prototype, "itemName", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", String)
    ], EditMerchItemRequest.prototype, "collection", void 0);
    __decorate([
        class_validator_1.Min(0),
        __metadata("design:type", Number)
    ], EditMerchItemRequest.prototype, "price", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], EditMerchItemRequest.prototype, "description", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", String)
    ], EditMerchItemRequest.prototype, "picture", void 0);
    __decorate([
        class_validator_1.Min(0),
        __metadata("design:type", Number)
    ], EditMerchItemRequest.prototype, "quantity", void 0);
    __decorate([
        class_validator_1.Min(0),
        class_validator_1.Max(100),
        __metadata("design:type", Number)
    ], EditMerchItemRequest.prototype, "discountPercentage", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Boolean)
    ], EditMerchItemRequest.prototype, "hidden", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Object)
    ], EditMerchItemRequest.prototype, "metadata", void 0);
    return EditMerchItemRequest;
})();
exports.EditMerchItemRequest = EditMerchItemRequest;
let MerchItemAndQuantity = /** @class */ (() => {
    class MerchItemAndQuantity {
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsUUID(),
        __metadata("design:type", String)
    ], MerchItemAndQuantity.prototype, "item", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.Min(0),
        __metadata("design:type", Number)
    ], MerchItemAndQuantity.prototype, "quantity", void 0);
    return MerchItemAndQuantity;
})();
exports.MerchItemAndQuantity = MerchItemAndQuantity;
let PlaceOrderRequest = /** @class */ (() => {
    class PlaceOrderRequest {
    }
    __decorate([
        class_transformer_1.Type(() => MerchItemAndQuantity),
        class_validator_1.IsDefined(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], PlaceOrderRequest.prototype, "order", void 0);
    return PlaceOrderRequest;
})();
exports.PlaceOrderRequest = PlaceOrderRequest;
let OrderItemFulfillmentUpdate = /** @class */ (() => {
    class OrderItemFulfillmentUpdate {
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsUUID(),
        __metadata("design:type", String)
    ], OrderItemFulfillmentUpdate.prototype, "uuid", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", Boolean)
    ], OrderItemFulfillmentUpdate.prototype, "fulfilled", void 0);
    __decorate([
        class_validator_1.Allow(),
        __metadata("design:type", String)
    ], OrderItemFulfillmentUpdate.prototype, "notes", void 0);
    return OrderItemFulfillmentUpdate;
})();
exports.OrderItemFulfillmentUpdate = OrderItemFulfillmentUpdate;
let FulfillMerchOrderRequest = /** @class */ (() => {
    class FulfillMerchOrderRequest {
    }
    __decorate([
        class_transformer_1.Type(() => OrderItemFulfillmentUpdate),
        class_validator_1.IsDefined(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], FulfillMerchOrderRequest.prototype, "items", void 0);
    return FulfillMerchOrderRequest;
})();
exports.FulfillMerchOrderRequest = FulfillMerchOrderRequest;
