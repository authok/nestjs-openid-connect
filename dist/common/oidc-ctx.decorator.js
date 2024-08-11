"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectOidcCtx = InjectOidcCtx;
const common_1 = require("@nestjs/common");
const const_tokens_1 = require("./const-tokens");
function InjectOidcCtx() {
    return (0, common_1.Inject)(const_tokens_1.OIDC_REQ_CTX);
}
