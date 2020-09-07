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
exports.AddActivitiesTable1595474518615 = void 0;
const typeorm_1 = require("typeorm");
const TABLE_NAME = 'Activities';
class AddActivitiesTable1595474518615 {
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
                        name: 'user',
                        type: 'uuid',
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enumName: 'enum_Activities_type',
                        enum: [
                            'ACCOUNT_CREATE',
                            'ACCOUNT_ACTIVATE',
                            'ACCOUNT_RESET_PASS',
                            'ACCOUNT_RESET_PASS_REQUEST',
                            'ACCOUNT_UPDATE_INFO',
                            'ACCOUNT_LOGIN',
                            'ATTEND_EVENT',
                            'MILESTONE',
                        ],
                    },
                    {
                        name: 'description',
                        type: 'varchar(255)',
                        isNullable: true,
                    },
                    {
                        name: 'pointsEarned',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'timestamp',
                        type: 'timestamptz',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'public',
                        type: 'boolean',
                        default: false,
                    },
                ],
            }));
            yield queryRunner.createIndices(TABLE_NAME, [
                new typeorm_1.TableIndex({
                    name: 'activities_uuid',
                    columnNames: ['uuid'],
                    isUnique: true,
                }),
                new typeorm_1.TableIndex({
                    name: 'public_activities_by_user_index',
                    columnNames: ['user'],
                    where: 'public = true',
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
exports.AddActivitiesTable1595474518615 = AddActivitiesTable1595474518615;
