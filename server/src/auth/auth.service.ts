import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/helpers/util';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@/modules/users/entities/user.entity';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { CodesService } from '@/modules/codes/codes.service';
import { MailerService } from '@nestjs-modules/mailer';
import { RedisCacheService } from '@/redis-cache/redis-cache.service';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { Response } from 'express';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly codeService: CodesService,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
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

  async login(user: User, res: Response): Promise<Object> {
    const tokenPayload: TokenPayload = { sub: user.id, role: user.role.code };
    const age = 60 * 60 * 1;
    const expiresRefreshToken = new Date(Date.now() + 5 * 1000);

    const accessToken = this.jwtService.sign(
      tokenPayload, 
      { 
        secret: this.configService.getOrThrow('JWT_SECRET'),
        expiresIn: age 
      },
    );

    const refreshToken = this.jwtService.sign(
      tokenPayload, 
      { 
        secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: age * 24 * 7
      },
    );

    await this.redisCacheService.set(
      `auth:${user.id}`, { 
        accessToken, 
        refreshToken: await hash(refreshToken, 10) 
      }, 3 * 60 * 60 * 1000
    );

    const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      domain: frontendDomain,
      expires: expiresRefreshToken,
    });

    return res.send({ accessToken });
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

  async refreshToken(token: string, userId: string) {
    if(!token) {
      throw new UnauthorizedException("Access Token is not valid!!!");
    }

    const user = await this.userService.findOne(userId);

    if(!user) {
      throw new NotFoundException("Your account doesn't exist!!!");
    }

    const { sub, role, exp } = await this.jwtService.verifyAsync(token);

    if(exp <= Date.now()) {
      throw new UnauthorizedException("Your login is expired!!!");
    }

    const payload = { sub, role };
    const age = 60 * 60 * 24;

    const accessToken =  await this.jwtService.signAsync(payload, { expiresIn: age });
    const refreshToken  =  await this.jwtService.signAsync(payload, { expiresIn: age * 2 });

    await this.redisCacheService.set(`auth:${sub}`, { accessToken, refreshToken }, 3 * 60 * 60 * 1000);
    return { accessToken, refreshToken };
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
