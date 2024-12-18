import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { RedisCacheService } from '@/redis-cache/redis-cache.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { comparePassword, hashPassword } from '@/helpers/util';

import { ResendMailAuthDto, VerifyAuthDto } from '@/auth/dto/verify-auth.dto';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { User } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { CodesService } from '@/modules/codes/codes.service';
import { TokenPayload } from '@/auth/token-payload.interface';

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

    if (!user) {
      throw new BadRequestException('Your email is not exist!!!');
    }

    if (!(await comparePassword(pass, user.password))) {
      throw new BadRequestException('Password is not match!!!');
    }

    return user;
  }

  generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    });
  }

  generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_REFRESH_TOKEN_EXPIRATION_MS',
      )}ms`,
    });
  }

  async login(user: User, res: Response): Promise<Object> {
    const tokenPayload: TokenPayload = { sub: user.id, role: user.role.code };

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setTime(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const accessToken = this.generateAccessToken(tokenPayload);

    const refreshToken = this.generateRefreshToken(tokenPayload);

    await this.redisCacheService.set(
      `auth:${user.id}`,
      {
        accessToken,
        refreshToken: await hashPassword(refreshToken),
      },
      parseInt(
        this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS'),
      ),
    );

    // const frontendDomain = this.configService.getOrThrow('FRONTEND_DOMAIN');

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      // domain: frontendDomain,
      expires: expiresRefreshToken,
    });

    return { accessToken };
  }

  async register(createAuthDto: CreateAuthDto): Promise<Object> {
    const { email, code } = await this.userService.register(createAuthDto);
    return await this.sendMail({ email, code });
  }

  async logout(userId: string, res: Response) {
    await this.redisCacheService.del(`auth:${userId}`);

    const frontendDomain = this.configService.getOrThrow('FRONTEND_DOMAIN');

    res.cookie('refresh', null, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      domain: frontendDomain,
      expires: new Date(),
    });
    return res.status(201).send({ message: 'Logout Successfully!!!' });
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

  async verifyAccessToken(token: string, userId: string) {
    if (!token) {
      throw new UnauthorizedException('Access Token is not valid!!!');
    }

    const { sub } = await this.jwtService.decode(token);

    const { accessToken, refreshToken } = await this.redisCacheService.get(
      `auth:${sub}`,
    );

    if (!accessToken && !refreshToken) {
      throw new NotFoundException("Your account doesn't exist!!!");
    }

    const user = await this.userService.findAuthOne(userId);

    if (!user) {
      throw new NotFoundException("Your account doesn't exist!!!");
    }

    return user;
  }

  async verifyRefreshToken(token: string, userId: string) {
    try {
      if (!token) {
        throw new UnauthorizedException('Refresh Token is not valid!!!');
      }

      const user = await this.userService.findAuthOne(userId);

      if (!user) {
        throw new NotFoundException("Your account doesn't exist!!!");
      }

      const { sub } = await this.jwtService.decode(token);

      const { accessToken, refreshToken } = await this.redisCacheService.get(
        `auth:${sub}`,
      );

      if (!accessToken || !refreshToken) {
        throw new UnauthorizedException('Your token is not valid!!!');
      }

      if (!(await comparePassword(token, refreshToken))) {
        throw new UnauthorizedException('Your token is not valid!!!');
      }

      return user;
    } catch (error) {
      return null;
    }
  }

  async sendMail(verifyAuthDto: VerifyAuthDto) {
    const { email, code } = verifyAuthDto;

    const user = await this.userService.findByEmail(email);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      template: 'register',
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        code,
        expiredCode: '5 minutes',
        currentYear: '2024',
        companyName: 'News Factory',
        unsubscribeUrl: 'https://pikayqi.vercel.com',
        homeUrl: 'http://localhost:5173',
        privacyUrl: '/',
        supportUrl: '/',
      },
    });

    return { message: 'Please check your email!!!' };
  }

  async checkResendMail(email: string) {
    if (!email) {
      throw new BadRequestException('Your email not exist');
    }

    const remainingTime = await this.codeService.expiredCodeCountDown(email);

    return { result: remainingTime };
  }

  async resendMail(resendMailAuthDto: ResendMailAuthDto) {
    const { email } = resendMailAuthDto;

    const user = await this.userService.findByEmail(email);

    if(!user) {
      throw new BadRequestException("Your email is not exist!!!");
    }

    if(user.isActive) {
      throw new BadRequestException("Your account is already actived!!!");
    }

    const remainingTime = await this.codeService.expiredCodeCountDown(email);

    if(remainingTime === 0) {
      await this.codeService.removeByEmail(email);

      const { code } = await this.codeService.generateCodeWithEmail(email);

      await this.sendMail({ email, code });
    } else {
      const code = await this.codeService.findOneByEmail(email);

      await this.sendMail({ email: code.email, code: code.code });
    }
    
    return { message: "Please check your mail again!!!" };
  }

  async getMe(id: string): Promise<Object> {
    return await this.userService.findMe(id);
  }
}
