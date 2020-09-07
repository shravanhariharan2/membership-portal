"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require("winston");
require("winston-daily-rotate-file");
const config_1 = require("../config");
exports.logger = winston.createLogger({
    level: config_1.Config.logging.level,
    format: winston.format.combine(winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json()),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.DailyRotateFile({
            dirname: 'logs',
            filename: '%DATE%.log',
            datePattern: 'YYYY-MM',
        }),
    ],
});
