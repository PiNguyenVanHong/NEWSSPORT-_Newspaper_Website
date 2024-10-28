import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRoleDto } from '@/modules/roles/dto/create-role.dto';
import { UpdateRoleDto } from '@/modules/roles/dto/update-role.dto';
import { Role } from '@/modules/roles/entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async isExistCode(code: string) {
    return await this.roleRepository.exists({ where: { code } });
  }

  async isExistLevel(level: number) {
    return await this.roleRepository.exists({ where: { level } });
  }

  async isExist(code: string, level: number) {
    if(await this.isExistCode(code)) {
      return true;
    }

    if(await this.isExistLevel(level)) {
      return true;
    }

    return false;
  }

  async create(createRoleDto: CreateRoleDto) {
    if((await this.isExist(createRoleDto.code.toUpperCase(), createRoleDto.level))) {
      throw new BadRequestException("Your role is exist/Match Level!!!");
    }

    const { code, name, description, level } = createRoleDto;

    const role = this.roleRepository.create({
      code: code.toUpperCase(), name, description, level
    });

    const newRole = await this.roleRepository.insert(role);

    return newRole.identifiers;
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOneBy({
      id
    }); 

    if(!role) {
      throw new BadRequestException("Role is not exist!!!");
    }
    
    return role;
  }

  async findOneByLevel(level: number) {
    const role = await this.roleRepository.findOneBy({
      level
    }); 

    if(!role) {
      throw new BadRequestException("Role is not exist!!!");
    }
    
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
