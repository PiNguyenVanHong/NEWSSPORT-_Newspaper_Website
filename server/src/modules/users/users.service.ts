import aqp from 'api-query-params';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { CodesService } from '@/modules/codes/codes.service';
import { RolesService } from '@/modules/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly codeService: CodesService,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Object> {
    const { email, password, roleId, firstName, lastName, avatar } =
      createUserDto;

    if (await this.isEmailExist(email)) {
      throw new BadRequestException(`Email already using another account!`);
    }

    if (!roleId) {
      throw new BadRequestException('Please choose a role!!!');
    }

    const role = await this.rolesService.findOne(roleId);

    const user = this.userRepository.create({
      email,
      password,
      firstName,
      lastName,
      avatar,
      role,
    });

    const newUser = await this.userRepository.save(user);

    return { id: newUser.id };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const skip = (current - 1) * pageSize;

    const [users, totalPages] = await this.userRepository.findAndCount({
      skip: skip,
      take: pageSize,
      select: ['id', 'firstName', 'lastName', 'email', 'avatar', 'createdAt', 'role'],
      relations: ['role'],
      order: sort,
    });

    await this.cacheManager.set(`all_user:abc:xyz`, { results: users, totalPages });

    return { results: users, totalPages };
  }

  async findMe(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      select: ['firstName', 'lastName', 'avatar', 'email'],
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role',],
    });
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    if (!(await this.findOne(updateUserDto.id)))
      throw new BadRequestException(`Email is not exist!`);

    return await this.userRepository.update(updateUserDto.id, {
      ...updateUserDto,
    });
  }

  async updateIsActiveByEmail(email: string, isActive: boolean) {
    await this.userRepository.update({ email }, {
      isActive
    })
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException(`Id should not be empty!`);
    if (!(await this.findOne(id)))
      throw new BadRequestException(`Email is not exist!`);
    return await this.userRepository.delete({ id });
  }

  async isEmailExist(email: string) {
    const isExist = await this.userRepository.exists({ where: { email } });

    if (isExist) return true;
    return false;
  }

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, confirmPassword, firstName, lastName } =
      createAuthDto;

    if (password !== confirmPassword) {
      throw new BadRequestException(`Password/ConfirmPassword not macth!`);
    }

    if (await this.isEmailExist(email)) {
      throw new BadRequestException(`Email already using another account!`);
    }

    const role = await this.rolesService.findOneByLevel(2);

    const user = this.userRepository.create({
      email,
      password,
      firstName,
      lastName,
      isActive: false,
      isTwoFactorEnabled: true,
      role,
    });
    
    const newUser = await this.userRepository.insert(user);

    const { code } = await this.codeService.generateCodeWithEmail(email);
    return { email: user.email, code };
  }
}
