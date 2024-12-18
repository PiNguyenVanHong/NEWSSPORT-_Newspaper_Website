import queryString from "query-string";
import { redirect } from "react-router-dom";
import { buildQueryString, getIdFromSlug } from "@/lib/utils";
import { getAllCategory, getCategoryByAlias } from "@/actions/category.api";
import {
  getAllArticle,
  getAllArticleByCategoryId,
  getAllArticleTopHeading,
  getArticleById,
  getArticleByMe,
} from "@/actions/article.api";
import { getFavoritesByUserId } from "@/actions/favorite.api";
import { getUserProfileById } from "@/actions/user.api";
import { getAllSocialLink } from "@/actions/social-link.api";
import { UserResponse } from "@/types/user.type";
import { SocialLinkResponse } from "@/types/social-link.type";

export const homepageLoader = async () => {
  try {
    const query = buildQueryString({
      filter: {
        current: 1,
        pageSize: 7,
      },
    });
    const { results } = await getAllArticleTopHeading(query);
    return { results: results.sort(() => Math.random() - 0.5) };
  } catch (error) {
    console.log(error);
    return { results: null };
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
  } catch (error) {
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

export const favoritesPageLoader = async () => {
  try {
    const { results } = await getFavoritesByUserId();

    return { results };
  } catch (error) {
    console.log(error);
    return redirect("/404");
  }
};

export const searchPageLoader = async ({ request }: { request: Request }) => {
  try {
    const { q } = queryString.parse(new URL(request.url).search);
    const query = buildQueryString({
      filter: {
        title: q?.toString() || "",
      },
    });

    const { meta, results } = await getAllArticle(query);

    return { q, meta, results };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const categoryDashboardPageLoader = async () => {
  try {
    const query = buildQueryString({
      filter: {
        isDeleted: "ALL",
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
      },
    });

    const { meta, results } = await getAllCategory(query);

    return { meta, categories: results };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const articleDashboardPageLoader = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const { current, pageSize } = queryString.parse(
      new URL(request.url).search
    );

    const { meta, results } = await getAllArticle(
      `?current=${current}&pageSize=${pageSize}&status=all`
    );

    return { meta, results };
  } catch (error) {
    console.log(error);
    return { meta: null, results: [] };
  }
};

export const ownArticleDashboardPageLoader = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const { current, pageSize } = queryString.parse(
      new URL(request.url).search
    );

    const { meta, results } = await getArticleByMe(
      `?current=${current}&pageSize=${pageSize}&status=all`
    );

    return { meta, articles: results };
  } catch (error) {
    console.log(error);
    return { meta: null, articles: [] };
  }
};

export const updateArticleDashboardPageLoader = async ({ params }: any) => {
  try {
    const { id } = params;

    const { result } = await getArticleById(id);
    const { results } = await getAllCategory();

    return {
      article: result,
      categories: results,
    };
  } catch (error) {
    console.log(error);
    return { result: null, categories: [] };
  }
};

export const topHeadingDashboardPageLoader = async () => {
  try {
    const { meta, results } = await getAllArticle();

    return { meta, articles: results };
  } catch (error) {
    console.log(error);
    return { meta: null, articles: [] };
  }
};

export const editUserProfilePageLoader = async () => {
  try {
    const { result: userProrfileRst } = await getUserProfileById();

    const { results: socialLinks } = await getAllSocialLink();

    return { userInfo: userProrfileRst, socialLinks };
  } catch (error) {
    console.log(error);
    return null;
  }
};
