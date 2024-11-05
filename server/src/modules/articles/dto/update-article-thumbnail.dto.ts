import { IsNotEmpty } from "class-validator";

export class UpdateArticleThumbnail {
    @IsNotEmpty()
    articleId: number;

    @IsNotEmpty()
    path: string;
}