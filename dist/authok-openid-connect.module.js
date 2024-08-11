"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthokOpenidConnectModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthokOpenidConnectModule = void 0;
const common_1 = require("@nestjs/common");
const openid_connect_module_1 = require("./openid-connect.module");
const oidc_auth_middleware_provider_1 = require("./providers/oidc-auth-middleware.provider");
const oidc_request_context_provider_1 = require("./providers/oidc-request-context.provider");
let AuthokOpenidConnectModule = AuthokOpenidConnectModule_1 = class AuthokOpenidConnectModule {
    static forRoot(options) {
        const providers = [
            {
                provide: 'OIDC_AUTH_OPTIONS',
                useValue: options,
            },
            oidc_request_context_provider_1.OidcRequestContextProvider,
            oidc_auth_middleware_provider_1.OIDCAuthMiddlewareProvider,
        ];
        return {
            module: AuthokOpenidConnectModule_1,
            providers,
            exports: providers,
        };
    }
    static forRootAsync(options) {
        return {
            module: AuthokOpenidConnectModule_1,
            imports: [openid_connect_module_1.OpenidConnectModule.forRootAsync(options)],
        };
    }
};
exports.AuthokOpenidConnectModule = AuthokOpenidConnectModule;
exports.AuthokOpenidConnectModule = AuthokOpenidConnectModule = AuthokOpenidConnectModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [oidc_request_context_provider_1.OidcRequestContextProvider, oidc_auth_middleware_provider_1.OIDCAuthMiddlewareProvider],
        exports: [oidc_request_context_provider_1.OidcRequestContextProvider, oidc_auth_middleware_provider_1.OIDCAuthMiddlewareProvider],
    })
], AuthokOpenidConnectModule);
