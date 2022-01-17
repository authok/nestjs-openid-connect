import { NestFactory } from '@nestjs/core';
import { Controller, UseGuards, Res, Module, Get } from '@nestjs/common';
import { Scopes, ScopesGuard } from '../';
import { Response } from 'express';
import { auth } from 'express-oauth2-bearer';

@Controller('products')
class ProductController {
  @Get()
  @UseGuards(ScopesGuard)
  @Scopes('read:products')
  products(@Res() res: Response) {
    res.json([
      { id: 1, name: 'Football boots' },
      { id: 2, name: 'Running shoes' },
      { id: 3, name: 'Flip flops' },
    ]);
  }
}


@Module({
  controllers: [ProductController],
})
class ProductApiModule {}

export async function createApplication() {
  const app = await NestFactory.create(ProductApiModule);

  app.use(auth({
    // issuerBaseURL: 'https://wsz.cn.authok.cn',
    allowedAudiences: 'https://api.example.com/products'
  }));

  return app;
}