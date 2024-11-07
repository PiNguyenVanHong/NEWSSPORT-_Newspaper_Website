import { ArticleResponse } from "./article.type";

export type FavoriteResponse = {
    id: string,
    createdAt: Date,
    article: ArticleResponse,
}