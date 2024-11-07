import { getToken } from "@/lib/utils";
import { FAVORITE_ROUTES, HeaderConfig, requestClient } from "./api.route";

export const getFavoritesByUserId = async (query?: string) => {
  if (!query) query = "";

  const token = await getToken();

  const { data } = await requestClient.get(
    FAVORITE_ROUTES + "/me" + query,
    HeaderConfig(token, false)
  );

  return data;
};

export const addFavorite = async (articleId: string) => {
  const token = await getToken();

  const { data } = await requestClient.post(
    FAVORITE_ROUTES,
    { articleId },
    HeaderConfig(token, false)
  );

  return data;
};

export const removeFavorite = async (articleId: string) => {
  const token = await getToken();

  const { data: result } = await requestClient.delete(FAVORITE_ROUTES, {
    data: { articleId },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
};

export const checkFavoriteByArticleId = async (articleId: string) => {
  const token = await getToken();

  const { data } = await requestClient.get(
    FAVORITE_ROUTES + `/check?articleId=${articleId}`,
    HeaderConfig(token, false)
  );

  return data;
};
