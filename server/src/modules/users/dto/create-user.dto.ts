import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  firstName: string;
  
  @IsOptional()
  lastName: string;
}
