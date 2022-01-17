import { MiddlewareConsumer, NestModule, RequestMethod, Type } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { AuthokOidcAuthMiddleware } from '../middleware/authok-oidc-auth.middleware';

export abstract class AuthBaseModule implements NestModule {
  protected setupRoutes?(...routes: (string | Type<any> | RouteInfo)[]) {
    if (routes.length) {
      return routes;
    }

    return ['*'];
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthokOidcAuthMiddleware)
      .exclude(
        'login',
        'logout',
        'callback'
        // { path: 'login', method: RequestMethod.GET },
        // { path: 'logout', method: RequestMethod.GET },
        // { path: 'callback', method: RequestMethod.POST }
      )
      .forRoutes(...this.setupRoutes());
  }
}