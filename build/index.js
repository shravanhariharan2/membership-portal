"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // this shim is required
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const models_1 = require("./models");
const config_1 = require("./config");
const RequestLogger_1 = require("./api/middleware/RequestLogger");
const Logger_1 = require("./utils/Logger");
const controllers_1 = require("./api/controllers");
routing_controllers_1.useContainer(typedi_1.Container);
typeorm_1.useContainer(typedi_1.Container);
typeorm_1.createConnection({
    type: 'postgres',
    host: config_1.Config.database.host,
    port: config_1.Config.database.port,
    username: config_1.Config.database.user,
    password: config_1.Config.database.pass,
    database: config_1.Config.database.name,
    entities: models_1.models,
    logging: config_1.Config.isDevelopment,
}).then(() => {
    Logger_1.logger.info('created connection');
}).catch((error) => {
    Logger_1.logger.error(error);
});
const app = routing_controllers_1.createExpressServer({
    cors: true,
    routePrefix: '/api/v1',
    controllers: controllers_1.controllers,
    middlewares: [RequestLogger_1.RequestLogger],
    defaults: {
        paramOptions: {
            required: true,
        },
    },
    validation: {
        whitelist: true,
        skipMissingProperties: true,
        forbidUnknownValues: true,
    },
});
app.listen(3000);
/**

TODOS:
- paging
  - max page size
  - note all paging endpoints max out at 100
  - move offset/limit defaults to services
  - add back paging for leaderboard, event searches
- make merch store names consistent
- make sure all cascading deletes set up on ManyToOne cols, not nullable fkeys
- migrate db
  - run 'UPDATE "Activities" SET public = false WHERE public IS NULL' before migration
- API response types
- publishing types

maybe TODOs:
- remove soft deleting events?
- remove numSold from MerchItem
- FindEventOptions/EventSearchOptions, add more filters
- no new/confirm pass
- look into subqueries for ActivityRepo
- include payloads in returned errors (see NotFound in MerchStoreService::placeOrder)

notes and breaks:
- renamed resetPassword -> passwordReset
- optional auth on some routes (and add it where appropriate)
- /milestone: resetPoints?: bool -> points?: number
- GET /collection/:uuid, changed 'merchandise' res field to 'items'
- removed GET /merchandise
- passwordChange field is breaking change (see Auth/UserControllerRequests)
- removed uuid from POST /user/picture/:uuid
- moved milestone and bonus routes to admin controller

getting this in prod:
- use test app on Heroku
- open PR in actual repo
- deploy PR branch to Heroku test app, including db migration
- test ourselves and then have the rest of the team test it
- if nothing breaks, merge and make sure the first event after goes smoothly

migration notes / schema diffs:
 - all: move primary key from id to uuid
 - all: index names are different, sequelize names them in English by default while
        typeorm gives a randomized name with numbers
 - all: discrepancies with NOT NULL (nullable) columns that have default values
        - typeorm automatically sets columns that don't specify nullable to NOT NULL,
          while sequelize automatically sets them to nullable
 - some: need to set DESC indexes for some columns (like timestamps) for typeorm via raw query
        (queryRunner.query) since not possible to do programatically / via API

 */
