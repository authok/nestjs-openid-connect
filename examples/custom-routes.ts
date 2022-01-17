import { Controller, Get, Module, Res, UseGuards, Req } from '@nestjs/common';
import {
  AuthokOpenidConnectModule,
  setupOidcAuth,
  RequiresAuth,
} from '../';
import { NestFactory } from '@nestjs/core';
import { Response } from 'express';

@Controller('/')
class FeatureController {
  @Get('/')
  public welcome() {
    return 'Welcome';
  }

  @Get('/profile')
  @UseGuards(RequiresAuth)
  public getProfile(@Req() req) {
    console.log('this.oidc.user', req.oidc.user);
    return `hello ${req.oidc.user.sub}`;
  }

  @Get('/login')
  public async login(@Res() res: Response) {
    await res.oidc.login({ return_to: '/profile' });
  }

  @Get('/custom-logout')
  public customLogout() {
    return 'Bye!';
  }
}

@Module({})
class FeatureModule {}

@Module({
  imports: [
    FeatureModule,
    AuthokOpenidConnectModule.forRootAsync({
      useFactory: () => {
        return {
          idpLogout: true,
          authRequired: false,
          routes: {
            login: false,
            postLogoutRedirect: '/custom-logout',
          },
        };
      },
    }),
  ],
  controllers: [FeatureController],
})
class MainAppModule {}

export async function createApplication() {
  const app = await NestFactory.create(MainAppModule);

  setupOidcAuth(app);

  return app;
}