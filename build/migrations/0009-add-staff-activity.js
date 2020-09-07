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
exports.AddStaffActivity1595474561776 = void 0;
const enumName = 'enum_Activities_type';
const enumValue = 'ATTEND_EVENT_AS_STAFF';
class AddStaffActivity1595474561776 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TYPE "${enumName}" ADD VALUE '${enumValue}' AFTER 'ATTEND_EVENT'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM pg_enum WHERE enumlabel='${enumValue}' AND `
                + `enumtypid =(SELECT oid FROM pg_type WHERE typname = '${enumName}')`);
        });
    }
}
exports.AddStaffActivity1595474561776 = AddStaffActivity1595474561776;
