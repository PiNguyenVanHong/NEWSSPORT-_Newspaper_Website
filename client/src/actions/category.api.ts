import { CATEGORY_ROUTES, GET_ALL_CATEGORY, HeaderConfig, requestClient } from "@/actions/api.route";
import { getToken } from "@/lib/utils";
import { CategoryRequest } from "@/types/category.type";

export const getAllCategory = async (query?: string) => {
  if (!query) query = "";

  const { data } = await requestClient.get(GET_ALL_CATEGORY + query);

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
}