import { IsBoolean, IsOptional } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';

export class UpdateUserProfileDto extends PartialType(
    OmitType(CreateUserDto, ["roleId", "password", "avatar"] as const),
) {
    @IsOptional()
    phone: string;

    @IsOptional()
    bio: string;

    @IsBoolean()
    isTwoFactorEnabled: boolean;
}
