import { MiddlewareConsumer, NestModule, Type } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
export declare abstract class AuthBaseModule implements NestModule {
    protected setupRoutes?(...routes: (string | Type<any> | RouteInfo)[]): (string | Type<any> | RouteInfo)[];
    configure(consumer: MiddlewareConsumer): void;
}
