"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiresAuth = void 0;
class RequiresAuth {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        return req.oidc.isAuthenticated();
    }
}
exports.RequiresAuth = RequiresAuth;
