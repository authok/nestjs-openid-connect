import { ValueProvider } from '@nestjs/common';
import { auth } from '@authok/express-openid-connect';
import { AuthokAuthMiddlware } from '../types/authok-oidc-types';

export const OIDCAuthMiddlewareProvider: ValueProvider<AuthokAuthMiddlware> = {
  provide: 'AUTH_MIDDLEWARE',
  useValue: auth,
};