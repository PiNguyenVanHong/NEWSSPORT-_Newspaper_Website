import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  expires: Date;
}
