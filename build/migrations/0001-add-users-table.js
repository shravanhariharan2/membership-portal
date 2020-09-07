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
exports.AddUsersTable1595474487693 = void 0;
const typeorm_1 = require("typeorm");
const TABLE_NAME = 'Users';
class AddUsersTable1595474487693 {
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
                        name: 'email',
                        type: 'varchar(255)',
                        isUnique: true,
                    },
                    {
                        name: 'profilePicture',
                        type: 'varchar(255)',
                        isNullable: true,
                    },
                    {
                        name: 'accessType',
                        type: 'enum',
                        enumName: 'enum_Users_accessType',
                        enum: ['RESTRICTED', 'STANDARD', 'ADMIN'],
                        default: '\'STANDARD\'',
                    },
                    {
                        name: 'state',
                        type: 'enum',
                        enumName: 'enum_Users_state',
                        enum: ['PENDING', 'ACTIVE', 'BLOCKED', 'PASSWORD_RESET'],
                        default: '\'PENDING\'',
                    },
                    {
                        name: 'accessCode',
                        type: 'varchar(255)',
                        isNullable: true,
                    },
                    {
                        name: 'firstName',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'lastName',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'hash',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'graduationYear',
                        type: 'integer',
                    },
                    {
                        name: 'major',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'points',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'lastLogin',
                        type: 'timestamptz',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }));
            yield queryRunner.createIndices(TABLE_NAME, [
                new typeorm_1.TableIndex({
                    name: 'users_uuid',
                    columnNames: ['uuid'],
                    isUnique: true,
                }),
                new typeorm_1.TableIndex({
                    name: 'users_email',
                    columnNames: ['email'],
                    isUnique: true,
                }),
                new typeorm_1.TableIndex({
                    name: 'users_access_code',
                    columnNames: ['accessCode'],
                    isUnique: true,
                }),
                new typeorm_1.TableIndex({
                    name: 'leaderboard_index',
                    columnNames: ['points'],
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
exports.AddUsersTable1595474487693 = AddUsersTable1595474487693;
