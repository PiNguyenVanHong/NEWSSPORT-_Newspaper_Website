import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    level: number;

    @IsOptional()
    description: string;
}
