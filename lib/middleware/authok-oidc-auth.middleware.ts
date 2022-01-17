import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthokAuthMiddlware } from '../types/authok-oidc-types';
import { AuthokOidcAuthOptions } from '../interface';

@Injectable()
export class AuthokOidcAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('AUTH_MIDDLEWARE') private readonly middleware: AuthokAuthMiddlware,
    @Inject('OIDC_AUTH_OPTIONS') private readonly options: AuthokOidcAuthOptions
  ) {}

  use(req: Request, res: Response, next: () => void): any {
    this.middleware({
      ...this.options,
    })(req, res, next);
  }
}