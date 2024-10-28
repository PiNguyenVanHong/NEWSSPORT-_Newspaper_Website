import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/helpers/util';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await comparePassword(pass, user.password))) {
      return null;
    }

    return user;
  }

  async login(user: any): Promise<Object> {
    const payload = { sub: user.id, role: user.role.code };
    const age = 60 * 60 * 24;

    return await this.jwtService.signAsync(payload, { expiresIn: age });
  }

  async register(createAuthDto: CreateAuthDto): Promise<Object> {
    return await this.userService.register(createAuthDto);
  }

  async getMe(id: string): Promise<Object> {
    return await this.userService.findMe(id);
  }
}
