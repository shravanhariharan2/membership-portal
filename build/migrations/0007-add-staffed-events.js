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
exports.AddStaffedEvents1595474545484 = void 0;
const typeorm_1 = require("typeorm");
const TABLE_NAME = 'Events';
class AddStaffedEvents1595474545484 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumns(TABLE_NAME, [
                new typeorm_1.TableColumn({
                    name: 'requiresStaff',
                    type: 'boolean',
                    default: false,
                }),
                new typeorm_1.TableColumn({
                    name: 'staffPointBonus',
                    type: 'integer',
                    default: 0,
                }),
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn(TABLE_NAME, 'requiresStaff');
            yield queryRunner.dropColumn(TABLE_NAME, 'staffPointBonus');
        });
    }
}
exports.AddStaffedEvents1595474545484 = AddStaffedEvents1595474545484;
