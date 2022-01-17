import { Controller, Get, Module, Req } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { auth } from '@authok/express-openid-connect';
import { AuthokOpenidConnectModule, setupOidcAuth } from '../lib';
import * as ConnectRedis from 'connect-redis';
import { RedisModule, RedisModuleOptions, RedisService } from 'nestjs-redis';

const RedisStore = ConnectRedis(auth);

@Controller('/')
class AppController {
  public constructor() {}

  @Get('/')
  public sayHello(@Req() req) {
    return `你好: ${req.oidc.user.sub}`;
  }
}

@Module({
  imports: [
    RedisModule.register({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASS || '',  
    } as RedisModuleOptions),
    AuthokOpenidConnectModule.forRootAsync({
      useFactory: (redisService: RedisService) => {
        return {
          idpLogout: true,
          session: {
            store: new RedisStore({ client: redisService.getClient() }),
          },
        }
      },
      inject: [RedisService],
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