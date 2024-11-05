import { buildQueryString, getIdFromSlug } from "@/lib/utils";
import { getAllCategory } from "@/actions/category.api";
import { getAllArticle, getArticleById } from "@/actions/article.api";

export const articleDetailPageLoader = async ({ params }: any) => {
  try {
    const alias = params.alias;
    const id = getIdFromSlug(alias);
    
    const { result } = await getArticleById(id);

    return { alias, article: result };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const categoryDashboardPageLoader = async () => {
  try {
    const query = buildQueryString({
      filter: {},
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
      },
    });

    const data = await getAllCategory(query);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const dataHomepage = async () => {
  try {
    const data = await getAllArticle();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
