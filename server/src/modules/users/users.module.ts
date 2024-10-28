import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { UsersController } from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';
import { CodesModule } from '@/modules/codes/codes.module';
import { Role } from '@/modules/roles/entities/role.entity';
import { RolesModule } from '@/modules/roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    CodesModule,
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
