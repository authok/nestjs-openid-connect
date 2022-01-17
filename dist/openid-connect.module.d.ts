import { DynamicModule } from '@nestjs/common';
import { OIDCModuleAsyncOptions } from './interface';
export declare class OpenidConnectModule {
    static forRoot(options: OIDCModuleAsyncOptions): DynamicModule;
    static forRootAsync(options: OIDCModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
