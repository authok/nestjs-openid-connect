"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OpenidConnectModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenidConnectModule = void 0;
const common_1 = require("@nestjs/common");
let OpenidConnectModule = OpenidConnectModule_1 = class OpenidConnectModule {
    static forRoot(options) {
        const provider = {
            provide: 'OIDC_AUTH_OPTIONS',
            useValue: options,
        };
        return {
            module: OpenidConnectModule_1,
            providers: [provider],
            exports: [provider],
        };
    }
    static forRootAsync(options) {
        return {
            module: OpenidConnectModule_1,
            imports: options.imports || [],
            providers: [...this.createAsyncProviders(options)],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const { useClass } = options;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: 'OIDC_AUTH_OPTIONS',
                useFactory: options.useFactory,
            };
        }
        const inject = [(options.useClass || options.useExisting)];
        return {
            provide: 'OIDC_AUTH_OPTIONS',
            useFactory: async (optionsFactory) => await optionsFactory.createOidcAuthOptions(),
            inject,
        };
    }
};
OpenidConnectModule = OpenidConnectModule_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Global)()
], OpenidConnectModule);
exports.OpenidConnectModule = OpenidConnectModule;
