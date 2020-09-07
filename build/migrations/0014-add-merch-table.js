"use strict";
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
exports.AddMerchTable1598590965470 = void 0;
const typeorm_1 = require("typeorm");
const TABLE_NAME = 'Merchandise';
class AddMerchTable1598590965470 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: TABLE_NAME,
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'uuid',
                        type: 'uuid',
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'itemName',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'collection',
                        type: 'uuid',
                    },
                    {
                        name: 'picture',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'price',
                        type: 'integer',
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'discountPercentage',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'monthlyLimit',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'lifetimeLimit',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'numSold',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'hidden',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'metadata',
                        type: 'text',
                        isNullable: true,
                    },
                ],
            }));
            yield queryRunner.createIndices(TABLE_NAME, [
                new typeorm_1.TableIndex({
                    name: 'merchandise_uuid',
                    columnNames: ['uuid'],
                    isUnique: true,
                }),
                new typeorm_1.TableIndex({
                    name: 'merchandise_collections_index',
                    columnNames: ['collection'],
                }),
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(TABLE_NAME);
        });
    }
}
exports.AddMerchTable1598590965470 = AddMerchTable1598590965470;
