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
exports.OrderItemModel = void 0;
const typeorm_1 = require("typeorm");
const OrderModel_1 = require("./OrderModel");
const MerchandiseItemModel_1 = require("./MerchandiseItemModel");
let OrderItemModel = /** @class */ (() => {
    let OrderItemModel = class OrderItemModel extends typeorm_1.BaseEntity {
        getPublicOrderItem() {
            return {
                uuid: this.uuid,
                item: this.item.getPublicMerchItem(),
                salePriceAtPurchase: this.salePriceAtPurchase,
                discountPercentageAtPurchase: this.discountPercentageAtPurchase,
                fulfilled: this.fulfilled,
                fulfilledAt: this.fulfilledAt,
                notes: this.notes,
            };
        }
    };
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], OrderItemModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], OrderItemModel.prototype, "uuid", void 0);
    __decorate([
        typeorm_1.ManyToOne((type) => OrderModel_1.OrderModel, (order) => order.items),
        typeorm_1.JoinColumn({ name: 'order' }),
        __metadata("design:type", OrderModel_1.OrderModel)
    ], OrderItemModel.prototype, "order", void 0);
    __decorate([
        typeorm_1.ManyToOne((type) => MerchandiseItemModel_1.MerchandiseModel, (item) => item.orders, { eager: true }),
        typeorm_1.JoinColumn({ name: 'item' }),
        __metadata("design:type", MerchandiseItemModel_1.MerchandiseModel)
    ], OrderItemModel.prototype, "item", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderItemModel.prototype, "salePriceAtPurchase", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderItemModel.prototype, "discountPercentageAtPurchase", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], OrderItemModel.prototype, "fulfilled", void 0);
    __decorate([
        typeorm_1.Column('timestamptz', { nullable: true }),
        __metadata("design:type", Date)
    ], OrderItemModel.prototype, "fulfilledAt", void 0);
    __decorate([
        typeorm_1.Column('text', { nullable: true }),
        __metadata("design:type", String)
    ], OrderItemModel.prototype, "notes", void 0);
    OrderItemModel = __decorate([
        typeorm_1.Entity('OrderItems')
    ], OrderItemModel);
    return OrderItemModel;
})();
exports.OrderItemModel = OrderItemModel;
