import { SetMetadata, ExecutionContext, CanActivate, Injectable, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Scopes = (...scopes: string[]) => {
  const expectedScopes = Array.prototype.concat(...scopes);
  expectedScopes
    .filter(es => typeof es !== 'string')
    .forEach(es => {
      throw new Error('expected string got ' + typeof es);
    });

  return SetMetadata('scopes', expectedScopes);
}


@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (!req.auth) {
      throw new BadRequestException('invalid token');
    }

    const expectedScopes = this.reflector.get<string[]>('scopes', context.getHandler());
    if (!expectedScopes) {
      return true;
    }
    
    const tokenScopes = req.auth.claims && typeof req.auth.claims.scope ===  'string' ?
      req.auth.claims.scope.split(' ') :
      [];

    const hasExpectedScopes = expectedScopes.every(s => tokenScopes.includes(s));

    if (!hasExpectedScopes) {
      return false;
    }

    return true;
  }
}