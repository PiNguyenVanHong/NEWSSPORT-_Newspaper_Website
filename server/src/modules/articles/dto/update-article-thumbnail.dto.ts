import { IsNotEmpty } from "class-validator";

export class UpdateArticleThumbnail {
    @IsNotEmpty()
    articleId: string;

    @IsNotEmpty()
    path: string;
}