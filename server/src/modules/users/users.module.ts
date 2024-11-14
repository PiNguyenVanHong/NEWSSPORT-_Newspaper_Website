import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from '@/modules/users/entities/user.entity';
import { UsersController } from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';
import { CodesModule } from '@/modules/codes/codes.module';
import { Role } from '@/modules/roles/entities/role.entity';
import { RolesModule } from '@/modules/roles/roles.module';
import { SocialLink } from '@/modules/social-links/entities/social-link.entity';
import { RedisCacheModule } from '@/redis-cache/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, SocialLink]),
    CodesModule,
    RolesModule,
    RedisCacheModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
