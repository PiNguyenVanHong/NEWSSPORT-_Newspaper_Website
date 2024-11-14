import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({ 
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
          ttl: 1 * 1000,
         }),
         inject: [ConfigService],
      }),
      isGlobal: false,
    }),
  ],
  controllers: [],
  providers: [
    RedisCacheService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [
    RedisCacheService,
  ]
})
export class RedisCacheModule {}
