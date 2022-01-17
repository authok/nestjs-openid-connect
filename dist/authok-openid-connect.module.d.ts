import { DynamicModule } from '@nestjs/common';
import { AuthokOidcAuthOptions, OIDCModuleAsyncOptions } from './interface';
export declare class AuthokOpenidConnectModule {
    static forRoot(options: AuthokOidcAuthOptions): DynamicModule;
    static forRootAsync(options: OIDCModuleAsyncOptions): DynamicModule;
}
