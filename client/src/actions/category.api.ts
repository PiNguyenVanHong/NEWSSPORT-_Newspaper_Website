import {
  CATEGORY_ROUTES,
  GET_ALL_CATEGORY,
  HeaderConfig,
} from "@/actions/api.route";
import { requestClient } from "@/actions/api.request";
import { getToken } from "@/lib/utils";
import { CategoryRequest } from "@/types/category.type";

export const getAllCategory = async (
  query?: string,
  current?: string,
  pageSize?: string
): Promise<any> => {
  if (!query) query = "?";

  const { data } = await requestClient.get(
    GET_ALL_CATEGORY + query + `&current=${current ?? 1}&pageSize=${pageSize ?? 10}`
  );

  return data;
};

export const getCategoryByAlias = async (alias: string): Promise<any> => {
  const { data } = await requestClient.get(CATEGORY_ROUTES, {
    params: {
      alias: alias.replace("/", ""),
    },
  });

  return data;
};

export const createCategory = async (body: CategoryRequest): Promise<any> => {
  const token = await getToken();

  const { data } = await requestClient.post(
    CATEGORY_ROUTES,
    body,
    HeaderConfig(token, false)
  );

  return data;
};
