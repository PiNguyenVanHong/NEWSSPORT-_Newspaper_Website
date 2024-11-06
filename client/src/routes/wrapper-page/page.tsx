import { useLoaderData } from "react-router-dom";

import ArticleDetailPage from "@/routes/article-detail/page";
import CategoryNewsPage from "@/routes/category/page";

function WrapperPage() {
  const { category, articles, alias, article } = useLoaderData() as any;

  return (
    <>
      {article && alias ? (
        <ArticleDetailPage alias={alias} article={article} />
      ) : (
        <CategoryNewsPage category={category} articles={articles} />
      )}
    </>
  );
}

export default WrapperPage;
