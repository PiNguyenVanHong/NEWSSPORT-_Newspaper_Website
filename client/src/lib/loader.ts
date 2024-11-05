import { getAllCategory } from "@/actions/category.api";
import { buildQueryString } from "./utils";

export const articleDetailPageLoader = async ({ params }: any) => {
  const alias = params.alias;
  return alias;
};

export const categoryDashboardPageLoader = async () => {
  try {
    const query = buildQueryString({
      filter: {
      },
      projection: {
        id: 1,
        name: 1,
        alias: 1,
        level: 1,
        isDeleted: 1,
        createdAt: 1,
      },
      sort: {
        level: 1,
      }
    });

    const data = await getAllCategory(query);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
