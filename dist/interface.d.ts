import { ConfigParams } from '@authok/express-openid-connect';
import { ModuleMetadata, Type } from '@nestjs/common';
type AuthokConfigMandatory = 'baseURL' | 'clientID' | 'issuerBaseURL' | 'secret';
type AuthokOidcConfig = ConfigParams;
export interface OIDCModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<OIDCAuthOptionsFactory>;
    useExisting?: Type<OIDCAuthOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<AuthokOidcAuthOptions> | AuthokOidcAuthOptions;
}
export type AuthokOidcBaseOptions = Required<Pick<AuthokOidcConfig, AuthokConfigMandatory>>;
export type AuthokOidcAuthOptions = Omit<AuthokOidcConfig, AuthokConfigMandatory>;
export interface OIDCAuthOptionsFactory {
    createOidcAuthOptions(): Promise<AuthokOidcAuthOptions> | AuthokOidcAuthOptions;
}
export {};
