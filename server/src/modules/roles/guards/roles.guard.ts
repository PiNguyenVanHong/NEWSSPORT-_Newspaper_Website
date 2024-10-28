import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { IS_ROLE_KEY } from '@/decorator/roles.decorator';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(IS_ROLE_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !roles.includes(user.role.code)) {
      throw new UnauthorizedException('Access Denied: Insufficient permissions');
    }

    return true;
  }
}
