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
exports.AddMerchCollectionsTable1598590154911 = void 0;
const typeorm_1 = require("typeorm");
const TABLE_NAME = 'MerchandiseCollections';
class AddMerchCollectionsTable1598590154911 {
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
                        name: 'title',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'archived',
                        type: 'boolean',
                        default: false,
                    },
                ],
            }));
            yield queryRunner.createIndices(TABLE_NAME, [
                new typeorm_1.TableIndex({
                    name: 'merchandise_collections_uuid',
                    columnNames: ['uuid'],
                    isUnique: true,
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
exports.AddMerchCollectionsTable1598590154911 = AddMerchCollectionsTable1598590154911;
