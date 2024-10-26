import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ["email", "password"] as const),
) {
    @IsNotEmpty()
    id:string;
}
