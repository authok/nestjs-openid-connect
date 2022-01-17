"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupOidcAuth = void 0;
function setupOidcAuth(app) {
    const middleware = app.get('AUTH_MIDDLEWARE');
    const options = app.get('OIDC_AUTH_OPTIONS');
    app.use(middleware({
        ...options,
    }));
}
exports.setupOidcAuth = setupOidcAuth;
