import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/passwort/local-auth.guard';
import { Request as ReqExpress } from 'express';
import { JwtAuthGuard } from './passwort/jwt-auth.guard';
import { Public } from '@/decorator/auth.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  handleLogin(@Request() req: ReqExpress) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  handleRegister(@Body() body: CreateAuthDto) {
    return this.authService.register(body);
  }
}
