import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
  Query,
} from '@nestjs/common';
import { Response as ResExpress } from 'express';
import { Public } from '@/decorator/auth.decorator';
import { Roles } from '@/decorator/roles.decorator';
import { Role } from '@/modules/roles/role.enum';

import { AuthService } from '@/auth/auth.service';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { LocalAuthGuard } from '@/auth/passwort/local-auth.guard';
import { ResendMailAuthDto, VerifyAuthDto } from '@/auth/dto/verify-auth.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CurrentUser } from '@/decorator/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { JwtRefreshAuthGuard } from '@/auth/passwort/jwt-refresh.guard';
import { JwtAuthGuard } from '@/auth/passwort/jwt-auth.guard';
import { RolesGuard } from '@/modules/roles/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  handleLogin(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: ResExpress,
  ) {
    return this.authService.login(user, res);
  }

  @Public()
  @Post('register')
  handleRegister(@Body() body: CreateAuthDto) {
    return this.authService.register(body);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  handelLogout(
    @CurrentUser() user: User,
    @Res() res: ResExpress,
  ) {
    return this.authService.logout(user.id, res);
  }

  @Public()
  @Post('verify')
  handleVerify(@Body() body: VerifyAuthDto) {
    return this.authService.verify(body);
  }

  @Public()
  @Get('resend-mail')
  handleCheckResendMail(@Query('email') email: string) {
    return this.authService.checkResendMail(email);
  }

  @Public()
  @Post('resend-mail')
  handleResendMail(@Body() body: ResendMailAuthDto) {
    return this.authService.resendMail(body);
  }

  @Get('me')
  @CacheKey('get_me')
  @CacheTTL(1)
  @Roles(Role.USER, Role.ADMIN, Role.WRITER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: User) {
    return this.authService.getMe(user.id);
  }

  @Post('refresh')
  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  hanleRefreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: ResExpress,
  ) {
    return this.authService.login(user, res);
  }

  @Get('mail')
  @Public()
  testMail(@Body() body: VerifyAuthDto) {
    return this.authService.sendMail(body);
  }
}
