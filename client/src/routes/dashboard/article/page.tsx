
import { format } from "date-fns";
import { useLoaderData } from "react-router-dom";
import { ArticleResponse } from "@/types/article.type";
import { MetaResponse } from "@/types/user.type";

import { ArticleClient } from "./_components/client";
import { ArticleColumn } from "./_components/column";
import HeaderAction from "@/components/dashboard/header-action";

function DashboardArticlePage() {
    const breadcrumbs = [{ label: "Pages", link: "/" }, { label: "Article" }];
    const { meta, results }: { meta: MetaResponse, results: ArticleResponse[] } = useLoaderData() as any;

  const formattedArticles: ArticleColumn[] = results.map((item) => ({
    id: item.id!,
    title: item.title!,
    category: item.category?.name!,
    date: format(new Date(item.createdAt!), "MMM do, yyyy hh:mm "),
    status: item.status!,
    user: item.user?.firstName! + " " + item.user?.lastName!,
  }));

  return (
    <div>
      <HeaderAction data={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <ArticleClient data={formattedArticles} />
        </div>
      </div>
    </div>
  );
}

export default DashboardArticlePage;
