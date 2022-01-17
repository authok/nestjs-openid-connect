import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthokAuthMiddlware } from '../types/authok-oidc-types';
import { AuthokOidcAuthOptions } from '../interface';
export declare class AuthokOidcAuthMiddleware implements NestMiddleware {
    private readonly middleware;
    private readonly options;
    constructor(middleware: AuthokAuthMiddlware, options: AuthokOidcAuthOptions);
    use(req: Request, res: Response, next: () => void): any;
}
