import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RedisCacheService } from '@/redis-cache/redis-cache.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    super({
      jwtFromRequest: async (req: Request) => {
        const authHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

        if(!authHeader) return null;

        const { sub } = await this.jwtService.decode(authHeader);

        const { accessToken, refreshToken } = await this.redisCacheService.get(`auth:${sub}`);

        if(!accessToken && !refreshToken) {
          return null;
        }

        return authHeader;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return { userId: payload.sub, role: payload.role };
  }
}
