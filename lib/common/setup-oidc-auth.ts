import { INestApplication } from '@nestjs/common';
import { AuthokAuthMiddlware } from '../types/authok-oidc-types';

export function setupOidcAuth(app: INestApplication): void {
  const middleware = app.get('AUTH_MIDDLEWARE') as AuthokAuthMiddlware;
  const options = app.get('OIDC_AUTH_OPTIONS');

  app.use(
    middleware({
      ...options,
    })
  );
}