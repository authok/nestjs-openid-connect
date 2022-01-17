import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthokOidcAuthOptions, OIDCModuleAsyncOptions } from './interface';
import { OpenidConnectModule } from './openid-connect.module';
import { OIDCAuthMiddlewareProvider } from './providers/oidc-auth-middleware.provider';
import { OidcRequestContextProvider } from './providers/oidc-request-context.provider';


@Global()
@Module({
  providers: [OidcRequestContextProvider, OIDCAuthMiddlewareProvider],
  exports: [OidcRequestContextProvider, OIDCAuthMiddlewareProvider],
})
export class AuthokOpenidConnectModule {
  public static forRoot(options: AuthokOidcAuthOptions): DynamicModule {
    const providers = [
      {
        provide: 'OIDC_AUTH_OPTIONS',
        useValue: options,
      },
      OidcRequestContextProvider,
      OIDCAuthMiddlewareProvider,
    ];

    return {
      module: AuthokOpenidConnectModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(options: OIDCModuleAsyncOptions): DynamicModule {
    return {
      module: AuthokOpenidConnectModule,
      imports: [OpenidConnectModule.forRootAsync(options)],
    };
  }
}
