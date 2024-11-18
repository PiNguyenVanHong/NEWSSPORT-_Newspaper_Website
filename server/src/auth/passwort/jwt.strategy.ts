import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '@/auth/token-payload.interface';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const authHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

        if(!authHeader) return null;

        return authHeader;
      },
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    return await this.authService.verifyAccessToken(req.headers.authorization?.split(' ')[1], payload.sub);
  }
}
