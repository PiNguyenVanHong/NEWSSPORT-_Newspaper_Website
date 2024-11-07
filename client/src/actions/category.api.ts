import {
  CATEGORY_ROUTES,
  GET_ALL_CATEGORY,
  HeaderConfig,
  requestClient,
} from "@/actions/api.route";
import { getToken } from "@/lib/utils";
import { CategoryRequest } from "@/types/category.type";

export const getAllCategory = async (query?: string, current?: string, pageSize?: string) => {
  if (!query) query = "";

  const { data } = await requestClient.get(GET_ALL_CATEGORY + query + `&current=${current}&pageSize=${pageSize}`);

  return data;
};

export const getCategoryByAlias = async (alias: string) => {
  const { data } = await requestClient.get(CATEGORY_ROUTES, {
    params: {
      alias: alias.replace("/", ""),
    },
  });

  return data;
};

export const createCategory = async (body: CategoryRequest) => {
  const token = await getToken();

  const { data } = await requestClient.post(
    CATEGORY_ROUTES,
    body,
    HeaderConfig(token, false)
  );

  return data;
};
