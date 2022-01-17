import { Injectable, Global, DynamicModule, Provider, Type } from '@nestjs/common';
import { OIDCModuleAsyncOptions, OIDCAuthOptionsFactory } from './interface';

@Injectable()
@Global()
export class OpenidConnectModule {
  public static forRoot(options: OIDCModuleAsyncOptions): DynamicModule {
    const provider = {
      provide: 'OIDC_AUTH_OPTIONS',
      useValue: options,
    };

    return {
      module: OpenidConnectModule,
      providers: [provider],
      exports: [provider],
    };
  }

  public static forRootAsync(options: OIDCModuleAsyncOptions): DynamicModule {
    return {
      module: OpenidConnectModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(options: OIDCModuleAsyncOptions): Provider[] {
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

  private static createAsyncOptionsProvider(options: OIDCModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: 'OIDC_AUTH_OPTIONS',
        useFactory: options.useFactory,
      };
    }

    const inject = [((options.useClass || options.useExisting) as unknown) as Type<OIDCAuthOptionsFactory>];

    return {
      provide: 'OIDC_AUTH_OPTIONS',
      useFactory: async (optionsFactory: OIDCAuthOptionsFactory) => await optionsFactory.createOidcAuthOptions(),
      inject,
    };
  }
}