import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/helpers/util';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@/modules/users/entities/user.entity';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { CodesService } from '@/modules/codes/codes.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly codeService: CodesService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if(!user) {
      throw new BadRequestException("Your email is not exist!!!");
    }

    if (!(await comparePassword(pass, user.password))) {
      throw new BadRequestException("Password is not match!!!");
    }

    return user;
  }

  async login(user: any): Promise<Object> {
    const payload = { sub: user.id, role: user.role.code };
    const age = 60 * 60 * 24;

    return await this.jwtService.signAsync(payload, { expiresIn: age });
  }

  async register(createAuthDto: CreateAuthDto): Promise<Object> {
    const { email, code } = await this.userService.register(createAuthDto);
    return await this.sendMail({ email, code });
  }

  async logout(data: any) {
    console.log(data.userId);
  }

  async verify(verifyAuthDto: VerifyAuthDto): Promise<Object> {
    const { email, code } = verifyAuthDto;

    const codeExist = await this.codeService.findOneByEmail(email);

    if (!codeExist) {
      throw new BadRequestException('Your email is not exist!!!');
    }

    if (codeExist.expires < new Date()) {
      await this.codeService.remove(codeExist.id);
      throw new BadRequestException('Your code expried!!!');
    }

    if (code !== codeExist.code) {
      throw new BadRequestException('Your code is not match!!!');
    }

    this.userService.updateIsActiveByEmail(codeExist.email, true);
    await this.codeService.remove(codeExist.id);

    return { message: 'Account is activated!!!' };
  }

  async sendMail(verifyAuthDto: VerifyAuthDto) {
    const { email, code } = verifyAuthDto;

    const user = await this.userService.findByEmail(email);

    await this.mailerService
      .sendMail({
        to: email, 
        subject: 'Testing Nest MailerModule ✔', 
        text: 'welcome', 
        template: "register",
        context: {
          firstName: user.firstName,
          lastName: user.lastName,
          code,
        }
      });

      return { message: "Please check your email!!!" };
  }

  async getMe(id: string): Promise<Object> {
    return await this.userService.findMe(id);
  }
}
