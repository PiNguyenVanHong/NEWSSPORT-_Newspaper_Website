import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Response,
  Res,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request as ReqExpress, Response as ResExpress } from 'express';
import { Public } from '@/decorator/auth.decorator';
import { Roles } from '@/decorator/roles.decorator';
import { Role } from '@/modules/roles/role.enum';

import { AuthService } from '@/auth/auth.service';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { LocalAuthGuard } from '@/auth/passwort/local-auth.guard';
import { VerifyAuthDto } from '@/auth/dto/verify-auth.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CurrentUser } from '@/decorator/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { JwtRefreshAuthGuard } from './passwort/jwt-refresh.guard';
import { JwtAuthGuard } from './passwort/jwt-auth.guard';
import { RolesGuard } from '@/modules/roles/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async handleLogin(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: ResExpress,
  ) {
    await this.authService.login(user, res);
  }

  @Public()
  @Post('register')
  handleRegister(@Body() body: CreateAuthDto) {
    return this.authService.register(body);
  }

  @Post('logout')
  async handelLogout(@Body() body: any, @Response() res: ResExpress) {
    await this.authService.logout(body);
    // const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    // res.cookie('accessToken', null, { httpOnly: true, domain: frontendDomain });

    return res.send({ message: 'Logout Successfully!!!' });
  }

  @Public()
  @Post('verify')
  handleVerify(@Body() body: VerifyAuthDto) {
    return this.authService.verify(body);
  }

  @Get('me')
  @CacheKey('get_me')
  @CacheTTL(1)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.WRITER)
  getMe(@Request() req: any) {
    const userId = req.user.userId;
    return this.authService.getMe(userId);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async hanleRefreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: ResExpress,
  ) {
    // await this.authService.login(user, res);
    return 'oke';
  }

  @Get('mail')
  @Public()
  testMail(@Body() body: VerifyAuthDto) {
    return this.authService.sendMail(body);
  }
}
