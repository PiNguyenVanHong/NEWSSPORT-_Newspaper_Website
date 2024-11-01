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
    thumbnail: File;

    @IsNotEmpty()
    category: string;
}
