import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from '@/modules/users/entities/user.entity';
import { UsersController } from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';
import { CodesModule } from '@/modules/codes/codes.module';
import { Role } from '@/modules/roles/entities/role.entity';
import { RolesModule } from '@/modules/roles/roles.module';
import { SocialLink } from '@/modules/social-links/entities/social-link.entity';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, SocialLink]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({ 
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
          ttl: 60 * 60 * 1000,
         }),
         inject: [ConfigService],
      }),
    }),
    CodesModule,
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
