"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupOidcAuth = setupOidcAuth;
function setupOidcAuth(app) {
    const middleware = app.get('AUTH_MIDDLEWARE');
    const options = app.get('OIDC_AUTH_OPTIONS');
    app.use(middleware({
        ...options,
    }));
}
