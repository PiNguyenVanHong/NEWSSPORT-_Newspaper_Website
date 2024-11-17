import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: any, user: any, info: { name: string }) {
    if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException("Your login is expired!!!");
    }

    if (err || !user) {
        throw err || new UnauthorizedException('Refresh Token is not valid!!!');
    }
    return user;
  }
}
