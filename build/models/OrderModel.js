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
exports.OrderModel = void 0;
const typeorm_1 = require("typeorm");
const UserModel_1 = require("./UserModel");
const OrderItemModel_1 = require("./OrderItemModel");
let OrderModel = /** @class */ (() => {
    let OrderModel = class OrderModel extends typeorm_1.BaseEntity {
        getPublicOrder() {
            return {
                uuid: this.uuid,
                user: this.user.uuid,
                totalCost: this.totalCost,
                orderedAt: this.orderedAt,
                items: this.items.map((oi) => oi.getPublicOrderItem()),
            };
        }
    };
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], OrderModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], OrderModel.prototype, "uuid", void 0);
    __decorate([
        typeorm_1.ManyToOne((type) => UserModel_1.UserModel, (user) => user.orders, { eager: true }),
        typeorm_1.JoinColumn({ name: 'user' }),
        typeorm_1.Index('orders_per_user_index'),
        __metadata("design:type", UserModel_1.UserModel)
    ], OrderModel.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderModel.prototype, "totalCost", void 0);
    __decorate([
        typeorm_1.Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP(6)' }),
        typeorm_1.Index('recent_orders_index'),
        __metadata("design:type", Date)
    ], OrderModel.prototype, "orderedAt", void 0);
    __decorate([
        typeorm_1.OneToMany((type) => OrderItemModel_1.OrderItemModel, (item) => item.order, { cascade: true, eager: true }),
        __metadata("design:type", Array)
    ], OrderModel.prototype, "items", void 0);
    OrderModel = __decorate([
        typeorm_1.Entity('Orders')
    ], OrderModel);
    return OrderModel;
})();
exports.OrderModel = OrderModel;
