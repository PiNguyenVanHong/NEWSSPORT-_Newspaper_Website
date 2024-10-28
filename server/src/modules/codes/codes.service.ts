import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(Code) private readonly codeRepository: Repository<Code>,
  ) {}

  async generateCodeWithEmail(email: string) {
    const code = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(Date.now() + 60 * 5);

    return this.create({ email, code, expires });
  }

  async create(createCodeDto: CreateCodeDto) {
    if(await this.isExist(createCodeDto.email)) {
      const existCode = await this.codeRepository.findOneBy({ email: createCodeDto.email });

      if(existCode.expires < new Date() ) {
        this.codeRepository.delete({ email: createCodeDto.email });
      } else {
        throw new BadRequestException("Your code just sent, please check your email!!!");
      }

    }

    const code = this.codeRepository.create(createCodeDto);

    return await this.codeRepository.save(code);
  }

  async isExist(email: string) {
    const isExist = await this.codeRepository.exists({ where: { email } });

    return isExist;
  };

  findAll() {
    return `This action returns all codes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  remove(id: number) {
    return `This action removes a #${id} code`;
  }
}
