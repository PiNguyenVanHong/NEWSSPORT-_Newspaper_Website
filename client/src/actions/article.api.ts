import { ARTICLE_ROUTES, HeaderConfig } from "@/actions/api.route";
import { getToken } from "@/lib/utils";
import { ArticleRequest } from "@/types/article.type";
import { requestClient } from "@/actions/api.request";

export const createArticle = async (
  body: ArticleRequest,
  formData: FormData
): Promise<any> => {
  const token = await getToken();

  const { data }: any = await requestClient.post(
    ARTICLE_ROUTES,
    body,
    HeaderConfig(token, false)
  );

  const result = await requestClient.post(
    `${ARTICLE_ROUTES}/uploads/${data.id}`,
    formData,
    HeaderConfig(token, true)
  );

  return result.data;
};

export const getAllArticle = async (query?: string): Promise<any> => {
  if (!query) query = "";

  const { data } = await requestClient.get(ARTICLE_ROUTES + query);

  return data;
};

export const getAllArticleTopHeading = async (query?: string): Promise<any> => {
  if (!query) query = "";

  const { data } = await requestClient.get(
    ARTICLE_ROUTES + "/top-heading" + query
  );

  return data;
};

export const getAllArticleByCategoryId = async (
  categoryId: string
): Promise<any> => {
  const { data } = await requestClient.get(ARTICLE_ROUTES, {
    params: {
      categoryId,
    },
  });

  return data;
};

export const getArticleById = async (id: string): Promise<any> => {
  const { data } = await requestClient.get(ARTICLE_ROUTES + "/" + id);

  return data;
};

export const getArticleByMe = async (query?: string): Promise<any> => {
  const token = await getToken();
  if (!query) query = "";

  const { data } = await requestClient.get(
    ARTICLE_ROUTES + "/me" + query,
    HeaderConfig(token)
  );

  return data;
};

export const updateStatusArticleById = async (
  id: string,
  status: string
): Promise<any> => {
  const token = await getToken();

  const { data } = await requestClient.patch(
    ARTICLE_ROUTES + "/" + id + "/status",
    {
      status,
    },
    HeaderConfig(token, false)
  );

  return data;
};

export const updateTopHeadingArticle = async (
  id: string,
  isTopHeading: boolean
): Promise<any> => {
  const token = await getToken();

  const { data } = await requestClient.patch(
    ARTICLE_ROUTES + "/" + id + "/top-heading",
    { isTopHeading },
    HeaderConfig(token, false)
  );

  return data;
};

export const updateArticle = async (
  articleId: string,
  body: ArticleRequest
) => {
  const token = await getToken();

  const { data } = await requestClient.patch(
    ARTICLE_ROUTES + "/" + articleId,
    body,
    HeaderConfig(token)
  );

  return data;
};
