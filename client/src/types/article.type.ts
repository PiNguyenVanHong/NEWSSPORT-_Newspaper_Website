import { UserResponse } from "@/types/user.type";
import { CategoryResponse } from "./category.type";

export type ArticleRequest = {
  title: string,
  description?: string,
  link?: string,
  content: string,
  categoryId: string,
};

export type ArticleResponse = {
  id?: string,
  title: string,
  link?: string,
  description?: string,
  thumbnail?: string,
  content?: string,
  status?: string,
  isTopHeading?: boolean,
  createdAt?: Date,
  user?: UserResponse,
  category?: CategoryResponse,
};
