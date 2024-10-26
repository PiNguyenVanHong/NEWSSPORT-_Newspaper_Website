import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/helpers/util';
import { User } from '@/modules/users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    
  }

  async validateUser(email: string, pass: string): Promise<Object> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await comparePassword(pass, user.password))) {
      return null;
    }

    return user;
  }

  async login(user: any): Promise<Object> {
    const payload = { sub: user.id };
    const age = 60 * 60 * 24;

    return {
      accessToken: await this.jwtService.signAsync(payload, { expiresIn: age }),
    };
  }

  async register(createAuthDto: CreateAuthDto): Promise<Object> {
    return this.userService.register(createAuthDto);
  }
}
