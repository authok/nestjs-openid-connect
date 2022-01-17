import { FactoryProvider } from '@nestjs/common';
import { RequestContext } from '@authok/express-openid-connect';
export declare const OidcRequestContextProvider: FactoryProvider<Promise<RequestContext>>;
