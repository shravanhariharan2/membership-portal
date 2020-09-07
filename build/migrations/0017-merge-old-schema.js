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
exports.MergeOldSchema1598743920351 = void 0;
const typeorm_1 = require("typeorm");
class MergeOldSchema1598743920351 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /* Change primary keys of all tables from id to uuid */
            /* Need to manually drop old ones since pkey names are different */
            yield queryRunner.query('ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "Users_pkey"');
            yield queryRunner.query('ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "PK_16d4f7d636df336db11d87413e3"');
            yield queryRunner.query('ALTER TABLE "Events" DROP CONSTRAINT IF EXISTS "Events_pkey"');
            yield queryRunner.query('ALTER TABLE "Events" DROP CONSTRAINT IF EXISTS "PK_efc6f7ffffa26a4d4fe5f383a0b"');
            yield queryRunner.query('ALTER TABLE "Attendances" DROP CONSTRAINT IF EXISTS "Attendances_pkey"');
            yield queryRunner.query('ALTER TABLE "Attendances" DROP CONSTRAINT IF EXISTS "PK_95d2bbe195bb697b84bae415391"');
            yield queryRunner.query('ALTER TABLE "Activities" DROP CONSTRAINT IF EXISTS "Activities_pkey"');
            yield queryRunner.query('ALTER TABLE "Activities" DROP CONSTRAINT IF EXISTS "PK_68241637da2837e6d5a4db6f806"');
            yield queryRunner
                .query('ALTER TABLE "MerchandiseCollections" DROP CONSTRAINT IF EXISTS "MerchandiseCollections_pkey"');
            yield queryRunner
                .query('ALTER TABLE "MerchandiseCollections" DROP CONSTRAINT IF EXISTS "PK_52b6ede422f478c511ae2c73cd0"');
            yield queryRunner.query('ALTER TABLE "Merchandise" DROP CONSTRAINT IF EXISTS "Merchandise_pkey"');
            yield queryRunner.query('ALTER TABLE "Merchandise" DROP CONSTRAINT IF EXISTS "PK_019351f9003428631a70caa0b81"');
            yield queryRunner.query('ALTER TABLE "Orders" DROP CONSTRAINT IF EXISTS "Orders_pkey"');
            yield queryRunner.query('ALTER TABLE "Orders" DROP CONSTRAINT IF EXISTS "PK_ce8e3c4d56e47ff9c8189c26213"');
            yield queryRunner.query('ALTER TABLE "OrderItems" DROP CONSTRAINT IF EXISTS "OrderItems_pkey"');
            yield queryRunner.query('ALTER TABLE "OrderItems" DROP CONSTRAINT IF EXISTS "PK_567f75d7ff079b9ab3e6dd33708"');
            /* Now, create them via API */
            yield queryRunner.createPrimaryKey('Users', ['uuid']);
            yield queryRunner.createPrimaryKey('Events', ['uuid']);
            yield queryRunner.createPrimaryKey('Attendances', ['uuid']);
            yield queryRunner.createPrimaryKey('Activities', ['uuid']);
            yield queryRunner.createPrimaryKey('MerchandiseCollections', ['uuid']);
            yield queryRunner.createPrimaryKey('Merchandise', ['uuid']);
            yield queryRunner.createPrimaryKey('Orders', ['uuid']);
            yield queryRunner.createPrimaryKey('OrderItems', ['uuid']);
            /* Match unique index names so TypeORM can properly use them */
            yield queryRunner.query('ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "Users_email_key"');
            yield queryRunner.query('ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "UQ_3c3ab3f49a87e6ddb607f3c4945"');
            yield queryRunner.query('ALTER TABLE "Users" ADD CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE (email)');
            yield queryRunner.query('ALTER TABLE "Events" DROP CONSTRAINT IF EXISTS "Events_attendanceCode_key"');
            yield queryRunner.query('ALTER TABLE "Events" DROP CONSTRAINT IF EXISTS "UQ_36def2ba671e2b24dbcb5ca3a09"');
            yield queryRunner
                .query('ALTER TABLE "Events" ADD CONSTRAINT "UQ_36def2ba671e2b24dbcb5ca3a09" UNIQUE ("attendanceCode")');
            /* Make all columns with default values NOT NULL */
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN uuid SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN "accessType" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN state SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN points SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN "lastLogin" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN uuid SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN organization SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN committee SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN location SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Attendances" ALTER COLUMN uuid SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Attendances" ALTER COLUMN timestamp SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN uuid SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN "pointsEarned" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN timestamp SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN public SET DEFAULT false');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN public SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "MerchandiseCollections" ALTER COLUMN uuid SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "MerchandiseCollections" ALTER COLUMN archived SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN uuid SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN quantity SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN "discountPercentage" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN "numSold" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "Orders" ALTER COLUMN uuid SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "OrderItems" ALTER COLUMN uuid SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "OrderItems" ALTER COLUMN fulfilled SET NOT NULL');
            /* Add defaults for NOT NULL columns */
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN uuid SET DEFAULT uuid_generate_v4()');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN "lastLogin" SET DEFAULT CURRENT_TIMESTAMP');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN uuid SET DEFAULT uuid_generate_v4()');
            yield queryRunner.query('ALTER TABLE "Attendances" ALTER COLUMN uuid SET DEFAULT uuid_generate_v4()');
            yield queryRunner.query('ALTER TABLE "Attendances" ALTER COLUMN timestamp SET DEFAULT CURRENT_TIMESTAMP');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN uuid SET DEFAULT uuid_generate_v4()');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN timestamp SET DEFAULT CURRENT_TIMESTAMP');
            yield queryRunner.query('ALTER TABLE "MerchandiseCollections" ALTER COLUMN uuid SET DEFAULT uuid_generate_v4()');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN uuid SET DEFAULT uuid_generate_v4()');
            yield queryRunner.query('ALTER TABLE "Orders" ALTER COLUMN uuid SET DEFAULT uuid_generate_v4()');
            yield queryRunner.query('ALTER TABLE "Orders" ALTER COLUMN "orderedAt" SET DEFAULT CURRENT_TIMESTAMP');
            yield queryRunner.query('ALTER TABLE "OrderItems" ALTER COLUMN uuid SET DEFAULT uuid_generate_v4()');
            yield queryRunner.query('ALTER TABLE "OrderItems" ALTER COLUMN "fulfilledAt" SET DEFAULT CURRENT_TIMESTAMP');
            /* Re-order rewrite's indexes to match old schema's index ordering */
            yield queryRunner.query('DROP INDEX leaderboard_index');
            yield queryRunner.query('CREATE INDEX leaderboard_index ON "Users" USING btree (points DESC NULLS FIRST)');
            yield queryRunner.query('DROP INDEX recent_orders_index');
            yield queryRunner.query('CREATE INDEX recent_orders_index ON "Orders" USING btree ("orderedAt" DESC NULLS FIRST)');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /* Re-change primary keys of all tables from uuid to id */
            yield queryRunner.updatePrimaryKeys('Users', [
                new typeorm_1.TableColumn({
                    name: 'id',
                    type: 'integer',
                }),
            ]);
            yield queryRunner.updatePrimaryKeys('Events', [
                new typeorm_1.TableColumn({
                    name: 'id',
                    type: 'integer',
                }),
            ]);
            yield queryRunner.updatePrimaryKeys('Attendances', [
                new typeorm_1.TableColumn({
                    name: 'id',
                    type: 'integer',
                }),
            ]);
            yield queryRunner.updatePrimaryKeys('Activities', [
                new typeorm_1.TableColumn({
                    name: 'id',
                    type: 'integer',
                }),
            ]);
            yield queryRunner.updatePrimaryKeys('MerchandiseCollections', [
                new typeorm_1.TableColumn({
                    name: 'id',
                    type: 'integer',
                }),
            ]);
            yield queryRunner.updatePrimaryKeys('Merchandise', [
                new typeorm_1.TableColumn({
                    name: 'id',
                    type: 'integer',
                }),
            ]);
            yield queryRunner.updatePrimaryKeys('Orders', [
                new typeorm_1.TableColumn({
                    name: 'id',
                    type: 'integer',
                }),
            ]);
            yield queryRunner.updatePrimaryKeys('OrderItems', [
                new typeorm_1.TableColumn({
                    name: 'id',
                    type: 'integer',
                }),
            ]);
            /* Make all changed NOT NULL columns to NULLABLE */
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN uuid DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN "accessType" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN state DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN points DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN "lastLogin" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN uuid DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN organization DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN committee DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN location DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN "eventLink" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Attendances" ALTER COLUMN uuid DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Attendances" ALTER COLUMN timestamp DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN uuid DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN "pointsEarned" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN timestamp DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN public DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN public DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "MerchandiseCollections" ALTER COLUMN uuid DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "MerchandiseCollections" ALTER COLUMN archived DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN uuid DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN quantity DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN "discountPercentage" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN "numSold" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "Orders" ALTER COLUMN uuid DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "OrderItems" ALTER COLUMN uuid DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "OrderItems" ALTER COLUMN fulfilled DROP NOT NULL');
            /* Remove defaults for NOT NULL columns */
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN uuid DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Users" ALTER COLUMN "lastLogin" DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Events" ALTER COLUMN uuid DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Attendances" ALTER COLUMN uuid DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Attendances" ALTER COLUMN timestamp DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN uuid DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Activities" ALTER COLUMN timestamp DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "MerchandiseCollections" ALTER COLUMN uuid DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Merchandise" ALTER COLUMN uuid DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Orders" ALTER COLUMN uuid DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "Orders" ALTER COLUMN "orderedAt" DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "OrderItems" ALTER COLUMN uuid DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "OrderItems" ALTER COLUMN "fulfilledAt" DROP DEFAULT');
        });
    }
}
exports.MergeOldSchema1598743920351 = MergeOldSchema1598743920351;
