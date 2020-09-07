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
const mail_1 = require("@sendgrid/mail");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const Logger_1 = require("../utils/Logger");
const config_1 = require("../config");
let EmailService = /** @class */ (() => {
    class EmailService {
        constructor() {
            this.mailer = new mail_1.MailService();
            this.mailer.setApiKey(config_1.Config.email.apiKey);
        }
        sendPasswordReset(email, firstName, code) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = {
                        to: email,
                        from: config_1.Config.email.user,
                        subject: 'ACM UCSD Membership Portal Password Reset',
                        html: ejs.render(EmailService.passwordResetTemplate, {
                            firstName,
                            link: `${config_1.Config.client}/resetPassword/${code}`,
                        }),
                    };
                    yield this.sendEmail(data);
                }
                catch (error) {
                    Logger_1.logger.warn(`Failed to send password reset email to ${email}`, { error });
                }
            });
        }
        sendEmailVerification(email, firstName, code) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = {
                        to: email,
                        from: config_1.Config.email.user,
                        subject: 'ACM UCSD Membership Portal Email Verification',
                        html: ejs.render(EmailService.emailVerificationTemplate, {
                            firstName,
                            link: `${config_1.Config.client}/emailVerification/${code}`,
                        }),
                    };
                    yield this.sendEmail(data);
                }
                catch (error) {
                    Logger_1.logger.warn(`Failed to send verification email to ${email}`, { error });
                }
            });
        }
        sendOrderConfirmation(email, firstName, order) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = {
                        to: email,
                        from: config_1.Config.email.user,
                        subject: 'ACM UCSD Merch Store Order Confirmation',
                        html: ejs.render(EmailService.orderConfirmationTemplate, { firstName, order }),
                    };
                    yield this.sendEmail(data);
                }
                catch (error) {
                    Logger_1.logger.warn(`Failed to send order confirmation email to ${email}`, { error });
                }
            });
        }
        static readTemplate(filename) {
            return fs.readFileSync(path.join(__dirname, `../templates/${filename}`), 'utf-8');
        }
        sendEmail(data) {
            return this.mailer.send(data);
        }
    }
    EmailService.passwordResetTemplate = EmailService.readTemplate('passwordReset.ejs');
    EmailService.emailVerificationTemplate = EmailService.readTemplate('emailVerification.ejs');
    EmailService.orderConfirmationTemplate = EmailService.readTemplate('orderConfirmation.ejs');
    return EmailService;
})();
exports.default = EmailService;
