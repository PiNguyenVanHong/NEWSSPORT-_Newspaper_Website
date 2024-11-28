import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Code } from './entities/code.entity';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(Code) private readonly codeRepository: Repository<Code>,
  ) {}

  async generateCodeWithEmail(email: string) {
    const code = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(Date.now() + 1000 * 60 * 5);
    await this.create({ email, code, expires });
    return { code };
  }

  async create(createCodeDto: CreateCodeDto) {
    if (await this.isExist(createCodeDto.email)) {
      const existCode = await this.codeRepository.findOneBy({
        email: createCodeDto.email,
      });

      if (existCode.expires < new Date()) {
        this.codeRepository.delete({ email: createCodeDto.email });
      } else {
        throw new BadRequestException(
          'Your code just sent, please check your email!!!',
        );
      }
    }

    const code = this.codeRepository.create(createCodeDto);
    return await this.codeRepository.save(code);
  }

  async isExist(email: string) {
    const isExist = await this.codeRepository.exists({ where: { email } });

    return isExist;
  }

  async findOneByEmail(email: string) {
    return await this.codeRepository.findOneBy({ email });
  }

  async expiredCodeCountDown(email: string) {
    const code = await this.findOneByEmail(email);

    if (!code) {
      return 0;
    }

    return Math.max(
      Math.floor((code.expires.getTime() - new Date().getTime()) / 1000),
      0,
    );
  }

  findAll() {
    return `This action returns all codes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  async remove(id: string) {
    await this.codeRepository.delete(id);
    return `Delete code successfully`;
  }

  async removeByEmail(email: string) {
    const code = await this.codeRepository.findOne({
      where: { email },
      select: ["id"]
    });

    if(code) {
      await this.codeRepository.delete(code.id);
    }
  }
}
