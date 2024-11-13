import { ArticleResponse } from "@/types/article.type";
import { MetaResponse } from "@/types/user.type";
import { useLoaderData } from "react-router-dom";
import { ArticleColumn } from "./_components/column";
import { format } from "date-fns";
import HeaderAction from "@/components/dashboard/header-action";
import { ArticleClient } from "./_components/client";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function DashboardOwnArticlePage() {
  const {
    meta,
    articles,
  }: { meta: MetaResponse; articles: ArticleResponse[] } =
    useLoaderData() as any;
  const { userId } = useContext(AuthContext) as any;

  const breadcrumbs = [{ label: "Pages", link: "/" }, { label: "Your Article" }];

  const formattedArticles: ArticleColumn[] = articles.map((item) => ({
    id: item.id!,
    title: item.title!,
    category: item.category?.name!,
    date: format(new Date(item.createdAt!), "MMM do, yyyy hh:mm "),
    status: item.status!,
    creator: item?.user?.id === userId ? "Me" : "Not You",
  }));

  return (
    <div>
      <HeaderAction data={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <ArticleClient data={formattedArticles} meta={meta} />
        </div>
      </div>
    </div>
  );
}

export default DashboardOwnArticlePage;
