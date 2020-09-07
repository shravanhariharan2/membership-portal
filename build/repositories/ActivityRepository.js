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
exports.ActivityRepository = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const ActivityModel_1 = require("../models/ActivityModel");
const BaseRepository_1 = require("./BaseRepository");
let ActivityRepository = /** @class */ (() => {
    var ActivityRepository_1;
    let ActivityRepository = ActivityRepository_1 = class ActivityRepository extends BaseRepository_1.BaseRepository {
        logActivity(user, type, pointsEarned, description) {
            return __awaiter(this, void 0, void 0, function* () {
                const activity = {
                    user,
                    type,
                    description,
                    pointsEarned,
                    public: ActivityRepository_1.isPublicActivityType(type),
                };
                return this.repository.save(ActivityModel_1.ActivityModel.create(activity));
            });
        }
        logMilestone(description, pointsEarned) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.manager.query('INSERT INTO "Activities" ("user", "type", "description", "pointsEarned", "public") '
                    + `SELECT uuid, '${types_1.ActivityType.MILESTONE}', '${description}', '${pointsEarned}', 'true' `
                    + 'FROM "Users"');
            });
        }
        logBonus(users, description, pointsEarned) {
            return __awaiter(this, void 0, void 0, function* () {
                const uuids = users.map((user) => `'${user.uuid}'`);
                return this.manager.query('INSERT INTO "Activities" ("user", "type", "description", "pointsEarned", "public") '
                    + `SELECT uuid, '${types_1.ActivityType.BONUS_POINTS}', '${description}', '${pointsEarned}', 'true' `
                    + `FROM "Users" WHERE uuid IN (${uuids})`);
            });
        }
        getUserActivityStream(user) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.repository.find({
                    where: { user, public: true },
                    order: { timestamp: 'ASC' },
                });
            });
        }
        static isPublicActivityType(type) {
            return ActivityRepository_1.publicActivityTypes.includes(type);
        }
    };
    ActivityRepository.publicActivityTypes = [
        types_1.ActivityType.ACCOUNT_CREATE,
        types_1.ActivityType.ATTEND_EVENT,
        types_1.ActivityType.ATTEND_EVENT_AS_STAFF,
        types_1.ActivityType.BONUS_POINTS,
        types_1.ActivityType.MILESTONE,
    ];
    ActivityRepository = ActivityRepository_1 = __decorate([
        typeorm_1.EntityRepository(ActivityModel_1.ActivityModel)
    ], ActivityRepository);
    return ActivityRepository;
})();
exports.ActivityRepository = ActivityRepository;
