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
exports.Events1596510890631 = void 0;
const EventModel_1 = require("../models/EventModel");
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;
const roundToHour = (date) => new Date(Math.round(date.getTime() / HOUR_IN_MILLISECONDS) * HOUR_IN_MILLISECONDS);
class Events1596510890631 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.manager.getRepository(EventModel_1.EventModel).save([
                {
                    uuid: 'f9de28ca-80cc-4aeb-b8ed-ee9a92954e24',
                    title: 'Bit-Byte Allocation',
                    description: 'The big reveal is here!',
                    committee: '',
                    location: 'Qualcomm Room',
                    start: roundToHour(new Date(Date.now() - DAY_IN_MILLISECONDS)),
                    end: roundToHour(new Date(Date.now() - (DAY_IN_MILLISECONDS - HOUR_IN_MILLISECONDS))),
                    attendanceCode: 'malloc',
                    pointValue: 20,
                    requiresStaff: false,
                    staffPointBonus: 0,
                }, {
                    uuid: '67f5223d-f721-402f-a536-2998101d7cd0',
                    title: 'Hack School - NodeJS',
                    description: 'Learn Node.',
                    committee: '',
                    location: 'PC ERC Room',
                    start: roundToHour(new Date(Date.now() - HOUR_IN_MILLISECONDS)),
                    end: roundToHour(new Date(Date.now() + HOUR_IN_MILLISECONDS)),
                    attendanceCode: 'n0d3',
                    pointValue: 30,
                    requiresStaff: true,
                    staffPointBonus: 5,
                }, {
                    uuid: 'bb95dea5-e9d4-4b65-8606-0286dbff4c05',
                    title: 'ACM Eats: Taco Stand',
                    description: 'Taco Tuesday.',
                    committee: '',
                    location: 'PC Loop',
                    start: roundToHour(new Date(Date.now() - HOUR_IN_MILLISECONDS)),
                    end: roundToHour(new Date(Date.now() + HOUR_IN_MILLISECONDS)),
                    attendanceCode: 'tac0',
                    pointValue: 15,
                    requiresStaff: false,
                    staffPointBonus: 0,
                }, {
                    uuid: 'c00b5de1-fffb-42a9-bf06-94a4022d016d',
                    title: 'Pool and Ping Pong',
                    description: 'Game night.',
                    committee: '',
                    location: 'PC Game Room',
                    start: roundToHour(new Date(Date.now() + (DAY_IN_MILLISECONDS - HOUR_IN_MILLISECONDS))),
                    end: roundToHour(new Date(Date.now() + DAY_IN_MILLISECONDS)),
                    attendanceCode: 'p0ng',
                    pointValue: 10,
                    requiresStaff: false,
                    staffPointBonus: 0,
                },
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.manager.createQueryBuilder().delete().from(EventModel_1.EventModel).execute();
        });
    }
}
exports.Events1596510890631 = Events1596510890631;
