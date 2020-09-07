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
exports.MerchandiseModel = void 0;
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const MerchandiseCollectionModel_1 = require("./MerchandiseCollectionModel");
const OrderItemModel_1 = require("./OrderItemModel");
let MerchandiseModel = /** @class */ (() => {
    let MerchandiseModel = class MerchandiseModel extends typeorm_1.BaseEntity {
        getPrice() {
            return Math.round(this.price * (1 - (this.discountPercentage / 100)));
        }
        getPublicMerchItem() {
            return underscore_1.pick(this, [
                'uuid',
                'itemName',
                'collection',
                'picture',
                'price',
                'quantity',
                'description',
                'discountPercentage',
                'monthlyLimit',
                'lifetimeLimit',
            ]);
        }
    };
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], MerchandiseModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], MerchandiseModel.prototype, "uuid", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], MerchandiseModel.prototype, "itemName", void 0);
    __decorate([
        typeorm_1.ManyToOne((type) => MerchandiseCollectionModel_1.MerchandiseCollectionModel, (col) => col.items, { nullable: false, eager: true, onDelete: 'CASCADE' }),
        typeorm_1.Index('merchandise_collections_index'),
        typeorm_1.JoinColumn({ name: 'collection' }),
        __metadata("design:type", MerchandiseCollectionModel_1.MerchandiseCollectionModel)
    ], MerchandiseModel.prototype, "collection", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], MerchandiseModel.prototype, "picture", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], MerchandiseModel.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], MerchandiseModel.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], MerchandiseModel.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], MerchandiseModel.prototype, "discountPercentage", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], MerchandiseModel.prototype, "monthlyLimit", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], MerchandiseModel.prototype, "lifetimeLimit", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], MerchandiseModel.prototype, "numSold", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], MerchandiseModel.prototype, "hidden", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: true,
            transformer: {
                to(value) {
                    return JSON.stringify(value);
                },
                from(value) {
                    return value ? JSON.parse(value) : null;
                },
            },
        }),
        __metadata("design:type", Object)
    ], MerchandiseModel.prototype, "metadata", void 0);
    __decorate([
        typeorm_1.OneToMany((type) => OrderItemModel_1.OrderItemModel, (orderItem) => orderItem.item),
        __metadata("design:type", OrderItemModel_1.OrderItemModel)
    ], MerchandiseModel.prototype, "orders", void 0);
    MerchandiseModel = __decorate([
        typeorm_1.Entity('Merchandise')
    ], MerchandiseModel);
    return MerchandiseModel;
})();
exports.MerchandiseModel = MerchandiseModel;
