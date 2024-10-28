import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if(!user.isActive) {
      throw new BadRequestException('Your account is not activated!!!');
    }

    if(user.isTwoFactorEnabled) {
      // TODO: Send code to email;
    }
    
    return user;
  }
}
