"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBaseModule = void 0;
const authok_oidc_auth_middleware_1 = require("../middleware/authok-oidc-auth.middleware");
class AuthBaseModule {
    setupRoutes(...routes) {
        if (routes.length) {
            return routes;
        }
        return ['*'];
    }
    configure(consumer) {
        consumer
            .apply(authok_oidc_auth_middleware_1.AuthokOidcAuthMiddleware)
            .exclude('login', 'logout', 'callback')
            .forRoutes(...this.setupRoutes());
    }
}
exports.AuthBaseModule = AuthBaseModule;
