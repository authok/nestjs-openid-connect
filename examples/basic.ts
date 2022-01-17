import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RequestContext } from '@authok/express-openid-connect';
import { AuthokOpenidConnectModule, InjectOidcCtx, setupOidcAuth } from '../lib';

@Controller('/')
class AppController {
  public constructor(@InjectOidcCtx() private readonly oidc: RequestContext) {}

  @Get('/')
  public sayHello() {
    return `你好: ${this.oidc.user.sub}`;
  }
}

@Module({
  imports: [
    AuthokOpenidConnectModule.forRoot({
      idpLogout: true,
    }),
  ],
  controllers: [AppController],
})
class MainAppModule {}

export async function createApplication() {
  const app = await NestFactory.create(MainAppModule);

  setupOidcAuth(app);

  return app;
}