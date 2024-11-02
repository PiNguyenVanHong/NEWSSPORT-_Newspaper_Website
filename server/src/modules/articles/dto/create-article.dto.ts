import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    link: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    categoryId: string;

    @IsOptional()
    userId: string;
}
