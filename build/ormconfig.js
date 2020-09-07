"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const dbConfig = {
    type: 'postgres',
    host: config_1.Config.database.host,
    port: config_1.Config.database.port,
    username: config_1.Config.database.user,
    password: config_1.Config.database.pass,
    database: config_1.Config.database.name,
    uri: config_1.Config.database.uri,
    entities: [
        'models/*.ts',
    ],
    synchronize: false,
};
module.exports = [
    Object.assign(Object.assign({}, dbConfig), { migrations: [
            'migrations/*.ts',
        ], cli: {
            entitiesDir: 'models/',
            migrationsDir: 'migrations/',
        } }),
    Object.assign(Object.assign({}, dbConfig), { name: 'seed', migrations: [
            'seeds/*.ts',
        ], cli: {
            entitiesDir: 'models/',
            migrationsDir: 'seeds/',
        } }),
];
