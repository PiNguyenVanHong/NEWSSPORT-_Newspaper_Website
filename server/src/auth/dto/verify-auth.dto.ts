import { IsNotEmpty, MaxLength } from "class-validator";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateAuthDto } from "@/auth/dto/create-auth.dto";

export class VerifyAuthDto extends PartialType(
    OmitType(CreateAuthDto, ["firstName", "lastName", "password", "confirmPassword"] as const),
) {
    @IsNotEmpty()
    @MaxLength(6)
    code: string;
}