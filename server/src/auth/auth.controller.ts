import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Response,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Request as ReqExpress, Response as ResExpress } from 'express';

import { Public } from '@/decorator/auth.decorator';
import { AuthService } from '@/auth/auth.service';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { LocalAuthGuard } from '@/auth/passwort/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
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

  @Get('me')
  getMe(@Request() req) {
    const userId = req.user.userId;
    return this.authService.getMe(userId); 
  }

  @Get('mail')
  @Public()
  testMail() {
    this.mailerService
      .sendMail({
        to: 'pi.nguyenvanhong@gmail.com', 
        subject: 'Testing Nest MailerModule ✔', 
        text: 'welcome', 
        template: "register",
        context: {
          name: "PiKayQi",
          id: 123456,
        }
      })
      .then(() => {})
      .catch(() => {});
    return 'sent successfull';
  }
}
