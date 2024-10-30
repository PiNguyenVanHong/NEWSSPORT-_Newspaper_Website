import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { LocalStrategy } from '@/auth/passwort/local.strategy';
import { UsersModule } from '@/modules/users/users.module';
import { JwtStrategy } from '@/auth/passwort/jwt.strategy';
import { CodesModule } from '@/modules/codes/codes.module';

@Module({
  imports: [
    UsersModule,
    CodesModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_ACCESS_TOKEN_EXPRIED'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
