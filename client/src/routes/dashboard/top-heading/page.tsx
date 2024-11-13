import HeaderAction from "@/components/dashboard/header-action";
import { TopHeadingClient } from "@/routes/dashboard/top-heading/_components/client";
import { format } from "date-fns";
import { TopHeadingColumn } from "./_components/column";
import { useLoaderData } from "react-router-dom";
import { MetaResponse } from "@/types/user.type";
import { ArticleResponse } from "@/types/article.type";

function DashboardTopHeadingPage() {
  const breadcrumbs = [
    { label: "Pages", link: "/dashboard" },
    { label: "Top Heading" },
  ];

  const { 
    meta, articles 
  }: { 
    meta: MetaResponse, 
    articles: ArticleResponse[], 
  } = useLoaderData() as any; 

  const formattedArticles: TopHeadingColumn[] = articles.map((item) => ({
    id: item.id!,
    title: item.title!,
    category: item.category?.name!,
    date: format(new Date(item.createdAt!), "MMM do, yyyy hh:mm "),
    creator: item.user?.firstName + " " + item?.user?.lastName,
    isTopHeading: item?.isTopHeading+"",
  }));

  return (
    <div>
      <HeaderAction data={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <TopHeadingClient data={formattedArticles} meta={meta} />
        </div>
      </div>
    </div>
  );
}

export default DashboardTopHeadingPage;
