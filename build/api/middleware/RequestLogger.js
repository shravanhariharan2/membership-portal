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
exports.RequestLogger = void 0;
const routing_controllers_1 = require("routing-controllers");
const moment = require("moment");
const morgan = require("morgan");
const uuid = require("uuid");
let RequestLogger = /** @class */ (() => {
    let RequestLogger = class RequestLogger {
        use(request, response, next) {
            return __awaiter(this, void 0, void 0, function* () {
                request.trace = uuid.v4().split('-').pop();
                morgan.token('date', () => `${moment().format('llll')} PT`);
                morgan.token('ip', () => `[IP ${request.headers['x-forwarded-for'] || '-'}]`);
                morgan.token('trace', () => `[Trace ${request.trace}]`);
                const logFn = morgan(':date :ip :trace :method :url :status :response-time[3]ms');
                logFn(request, response, next);
            });
        }
    };
    RequestLogger = __decorate([
        routing_controllers_1.Middleware({ type: 'before' })
    ], RequestLogger);
    return RequestLogger;
})();
exports.RequestLogger = RequestLogger;
