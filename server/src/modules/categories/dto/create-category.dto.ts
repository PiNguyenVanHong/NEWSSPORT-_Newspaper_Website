import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;

    @IsNotEmpty()
    alias: string;

    @IsNotEmpty()
    level: number;
}
