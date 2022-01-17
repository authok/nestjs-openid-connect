"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OidcRequestContextProvider = void 0;
const common_1 = require("@nestjs/common");
const const_tokens_1 = require("../common/const-tokens");
exports.OidcRequestContextProvider = {
    provide: const_tokens_1.OIDC_REQ_CTX,
    useFactory: async (req) => {
        return req.oidc;
    },
    scope: common_1.Scope.REQUEST,
    inject: ['REQUEST'],
};
