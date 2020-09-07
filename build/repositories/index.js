"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("./UserRepository");
const AttendanceRepository_1 = require("./AttendanceRepository");
const EventRepository_1 = require("./EventRepository");
const MerchOrderRepository_1 = require("./MerchOrderRepository");
const MerchStoreRepository_1 = require("./MerchStoreRepository");
const ActivityRepository_1 = require("./ActivityRepository");
class Repositories {
    static activity(transactionalEntityManager) {
        return transactionalEntityManager.getCustomRepository(ActivityRepository_1.ActivityRepository);
    }
    static attendance(transactionalEntityManager) {
        return transactionalEntityManager.getCustomRepository(AttendanceRepository_1.AttendanceRepository);
    }
    static event(transactionalEntityManager) {
        return transactionalEntityManager.getCustomRepository(EventRepository_1.EventRepository);
    }
    static merchOrder(transactionalEntityManager) {
        return transactionalEntityManager.getCustomRepository(MerchOrderRepository_1.MerchOrderRepository);
    }
    static merchOrderItem(transactionalEntityManager) {
        return transactionalEntityManager.getCustomRepository(MerchOrderRepository_1.OrderItemRepository);
    }
    static merchStoreCollection(transactionalEntityManager) {
        return transactionalEntityManager.getCustomRepository(MerchStoreRepository_1.MerchCollectionRepository);
    }
    static merchStoreItem(transactionalEntityManager) {
        return transactionalEntityManager.getCustomRepository(MerchStoreRepository_1.MerchItemRepository);
    }
    static user(transactionalEntityManager) {
        return transactionalEntityManager.getCustomRepository(UserRepository_1.UserRepository);
    }
}
exports.default = Repositories;
