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
exports.MerchItemRepository = exports.MerchCollectionRepository = void 0;
const typeorm_1 = require("typeorm");
const MerchandiseCollectionModel_1 = require("../models/MerchandiseCollectionModel");
const MerchandiseItemModel_1 = require("../models/MerchandiseItemModel");
const BaseRepository_1 = require("./BaseRepository");
let MerchCollectionRepository = /** @class */ (() => {
    let MerchCollectionRepository = class MerchCollectionRepository extends BaseRepository_1.BaseRepository {
        findByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.findOne(uuid, { relations: ['items'] });
            });
        }
        getAllCollections() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({ relations: ['items'] });
            });
        }
        getAllActiveCollections() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({
                    where: { archived: false },
                });
            });
        }
        upsertMerchCollection(collection, changes) {
            return __awaiter(this, void 0, void 0, function* () {
                if (changes)
                    collection = MerchandiseCollectionModel_1.MerchandiseCollectionModel.merge(collection, changes);
                return this.repository.save(collection);
            });
        }
        deleteMerchCollection(collection) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.repository.remove(collection);
            });
        }
    };
    MerchCollectionRepository = __decorate([
        typeorm_1.EntityRepository(MerchandiseCollectionModel_1.MerchandiseCollectionModel)
    ], MerchCollectionRepository);
    return MerchCollectionRepository;
})();
exports.MerchCollectionRepository = MerchCollectionRepository;
let MerchItemRepository = /** @class */ (() => {
    let MerchItemRepository = class MerchItemRepository extends BaseRepository_1.BaseRepository {
        findByUuid(uuid) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.findOne(uuid);
            });
        }
        batchFindByUuid(uuids) {
            return __awaiter(this, void 0, void 0, function* () {
                const items = yield this.repository.findByIds(uuids);
                return new Map(items.map((item) => [item.uuid, item]));
            });
        }
        upsertMerchItem(item, changes) {
            return __awaiter(this, void 0, void 0, function* () {
                if (changes)
                    item = MerchandiseItemModel_1.MerchandiseModel.merge(item, changes);
                return this.repository.save(item);
            });
        }
        updateMerchItemsInCollection(collection, discountPercentage) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.repository.createQueryBuilder()
                    .update()
                    .set({ discountPercentage })
                    .where({ collection })
                    .execute();
            });
        }
        deleteMerchItem(item) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.repository.remove(item);
            });
        }
    };
    MerchItemRepository = __decorate([
        typeorm_1.EntityRepository(MerchandiseItemModel_1.MerchandiseModel)
    ], MerchItemRepository);
    return MerchItemRepository;
})();
exports.MerchItemRepository = MerchItemRepository;
