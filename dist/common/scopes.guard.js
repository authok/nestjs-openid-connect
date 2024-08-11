"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopesGuard = exports.Scopes = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const Scopes = (...scopes) => {
    const expectedScopes = Array.prototype.concat(...scopes);
    expectedScopes
        .filter(es => typeof es !== 'string')
        .forEach(es => {
        throw new Error('expected string got ' + typeof es);
    });
    return (0, common_1.SetMetadata)('scopes', expectedScopes);
};
exports.Scopes = Scopes;
let ScopesGuard = class ScopesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        if (!req.auth) {
            throw new common_1.BadRequestException('invalid token');
        }
        const expectedScopes = this.reflector.get('scopes', context.getHandler());
        if (!expectedScopes) {
            return true;
        }
        const tokenScopes = req.auth.claims && typeof req.auth.claims.scope === 'string' ?
            req.auth.claims.scope.split(' ') :
            [];
        const hasExpectedScopes = expectedScopes.every(s => tokenScopes.includes(s));
        if (!hasExpectedScopes) {
            return false;
        }
        return true;
    }
};
exports.ScopesGuard = ScopesGuard;
exports.ScopesGuard = ScopesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ScopesGuard);
