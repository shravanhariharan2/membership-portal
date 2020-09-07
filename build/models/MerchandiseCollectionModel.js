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
exports.MerchandiseCollectionModel = void 0;
const typeorm_1 = require("typeorm");
const MerchandiseItemModel_1 = require("./MerchandiseItemModel");
let MerchandiseCollectionModel = /** @class */ (() => {
    let MerchandiseCollectionModel = class MerchandiseCollectionModel extends typeorm_1.BaseEntity {
        getPublicMerchCollection() {
            return {
                uuid: this.uuid,
                title: this.title,
                description: this.description,
                items: this.items.map((i) => i.getPublicMerchItem()),
            };
        }
    };
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('increment'),
        __metadata("design:type", Number)
    ], MerchandiseCollectionModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        typeorm_1.Index({ unique: true }),
        __metadata("design:type", String)
    ], MerchandiseCollectionModel.prototype, "uuid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], MerchandiseCollectionModel.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], MerchandiseCollectionModel.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], MerchandiseCollectionModel.prototype, "archived", void 0);
    __decorate([
        typeorm_1.OneToMany((type) => MerchandiseItemModel_1.MerchandiseModel, (item) => item.collection, { cascade: true }),
        __metadata("design:type", Array)
    ], MerchandiseCollectionModel.prototype, "items", void 0);
    MerchandiseCollectionModel = __decorate([
        typeorm_1.Entity('MerchandiseCollections')
    ], MerchandiseCollectionModel);
    return MerchandiseCollectionModel;
})();
exports.MerchandiseCollectionModel = MerchandiseCollectionModel;
