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
exports.AddEventsTable1595474505142 = void 0;
const typeorm_1 = require("typeorm");
const TABLE_NAME = 'Events';
class AddEventsTable1595474505142 {
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
                        name: 'organization',
                        type: 'varchar(255)',
                        default: '\'ACM\'',
                    },
                    {
                        name: 'committee',
                        type: 'varchar(255)',
                        default: '\'ACM\'',
                    },
                    {
                        name: 'thumbnail',
                        type: 'varchar(255)',
                        isNullable: true,
                    },
                    {
                        name: 'cover',
                        type: 'varchar(255)',
                        isNullable: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'location',
                        type: 'varchar(255)',
                        isNullable: true,
                    },
                    {
                        name: 'eventLink',
                        type: 'varchar(255)',
                        isNullable: true,
                    },
                    {
                        name: 'start',
                        type: 'timestamptz',
                    },
                    {
                        name: 'end',
                        type: 'timestamptz',
                    },
                    {
                        name: 'attendanceCode',
                        type: 'varchar(255)',
                        isUnique: true,
                    },
                    {
                        name: 'pointValue',
                        type: 'integer',
                    },
                    {
                        name: 'deleted',
                        type: 'boolean',
                        default: false,
                    },
                ],
            }));
            yield queryRunner.createIndices(TABLE_NAME, [
                new typeorm_1.TableIndex({
                    name: 'events_uuid',
                    columnNames: ['uuid'],
                    isUnique: true,
                }),
                new typeorm_1.TableIndex({
                    name: 'event_start_end_index',
                    columnNames: ['start', 'end'],
                }),
                new typeorm_1.TableIndex({
                    name: 'events_committee',
                    columnNames: ['committee'],
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
exports.AddEventsTable1595474505142 = AddEventsTable1595474505142;
