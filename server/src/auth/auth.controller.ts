import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Response,
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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async handleLogin(
      @Request() req: ReqExpress, 
      @Response() res: ResExpress
  ) {
    const accessToken = await this.authService.login(req.user);
    const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    res.cookie('accessToken', accessToken, {httpOnly: true, domain: frontendDomain,})
    return res.send({ accessToken });
  }

  @Public()
  @Post('register')
  handleRegister(@Body() body: CreateAuthDto) {
    return this.authService.register(body);
  }

  @Post('logout')
  async handelLogout(
    @Body() body: any,
    @Response() res: ResExpress
  ) {
    await this.authService.logout(body);
    const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    res.cookie('accessToken', null, { httpOnly: true, domain: frontendDomain})

    return res.send({ message: "Logout Successfully!!!" })
  }

  @Public()
  @Post('verify')
  handleVerify(@Body() body: VerifyAuthDto) {
    return this.authService.verify(body);
  }

  @Get('me')
  @Roles(Role.USER, Role.ADMIN, Role.WRITER)
  getMe(@Request() req: any) {
    const userId = req.user.userId;
    return this.authService.getMe(userId); 
  }

  @Get('mail')
  @Public()
  testMail(@Body() body: VerifyAuthDto) {
    return this.authService.sendMail(body);
  }
}
