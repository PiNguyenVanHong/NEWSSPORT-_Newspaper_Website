import { RedisCacheService } from "@/redis-cache/redis-cache.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-local";
import { TokenPayload } from "../token-payload.interface";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        public configService: ConfigService,
        private readonly redisCacheService: RedisCacheService,
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
      ) {
        super({
          jwtFromRequest: async (req: Request) => {
            const cookieToken = req.cookies.refresh;

            const { sub } = await this.jwtService.verify(cookieToken);
    
            const { accessToken, refreshToken } = await this.redisCacheService.get(`auth:${sub}`);

            if(!accessToken || !refreshToken) {
                return null;
            }

            if(!(await compare(cookieToken, refreshToken))) {
                return null;
            }
    
            return cookieToken;
          },
          ignoreExpiration: false,
          secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
          passReqToCallBack: true,
        });
      }

      async validate(request: Request, payload: TokenPayload) {
        return this.authService.refreshToken(request.cookies.refresh, payload.sub);
      }
}