import { buildQueryString, getIdFromSlug } from "@/lib/utils";
import { getAllCategory, getCategoryByAlias } from "@/actions/category.api";
import {
  getAllArticle,
  getAllArticleByCategoryId,
  getArticleById,
} from "@/actions/article.api";
import { redirect } from "react-router-dom";

export const homepageLoader = async () => {
  try {
    const { results } = await getAllArticle();
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const wrapperPageLoader = async ({ params }: any) => {
  const { alias } = params;

  try {
    if (alias?.includes(".html")) {
      const result = await articleDetailLoader({ params });
      if (!result?.article) throw new Error("Not Found");
      return result;
    } else {
      const result = await categoryLoader({ params });
      if (!result.category) throw new Error("Not Found");
      return result;
    }
  } catch(error) {
    console.log(error);
    
    return redirect("/404");
  }
};

export const categoryLoader = async ({ params }: any) => {
  try {
    const { results: rstCate } = await getCategoryByAlias(params.alias);

    if (!rstCate || rstCate.length <= 0)
      throw new Response("Not Found", { status: 404 });

    const { results: rstArti } = await getAllArticleByCategoryId(rstCate[0].id);

    return {
      alias: null,
      article: null,
      category: rstCate[0],
      articles: rstArti,
    };
  } catch (error) {
    return { category: null, articles: [] };
  }
};

export const articleDetailLoader = async ({ params }: any) => {
  try {
    const alias = params.alias;
    const id = getIdFromSlug(alias);

    const { result } = await getArticleById(id);

    return { alias, article: result, category: null, articles: [] };
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
