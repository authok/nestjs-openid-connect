"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OIDCAuthMiddlewareProvider = void 0;
const express_openid_connect_1 = require("@authok/express-openid-connect");
exports.OIDCAuthMiddlewareProvider = {
    provide: 'AUTH_MIDDLEWARE',
    useValue: express_openid_connect_1.auth,
};
