import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { Role } from '@/modules/roles/role.enum';
import { Roles } from '@/decorator/roles.decorator';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '@/auth/passwort/jwt-auth.guard';
import { RolesGuard } from '@/modules/roles/guards/roles.guard';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto): Promise<Object> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CacheKey("all_users")
  @CacheTTL(1)
  findAll(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return this.usersService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
