import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RequiresAuth implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>;
}
