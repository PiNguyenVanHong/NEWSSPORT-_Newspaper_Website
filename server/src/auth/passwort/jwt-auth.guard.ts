import { IS_PUBLIC_KEY } from '@/decorator/auth.decorator';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  // handleRequest(err: any, user: any, info: { name: string; mesage: string; stack: any }) {
  //   if(info?.name === 'TokenExpiredError') {
  //     throw new UnauthorizedException("Your login is expired!!!");
  //   }

  //   if (err || !user) {
  //     throw err || new UnauthorizedException('Access Token is not valid!!!');
  //   }
  //   return user;
  // }
}
