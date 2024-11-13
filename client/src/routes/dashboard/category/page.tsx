import { format } from "date-fns";

import HeaderAction from "@/components/dashboard/header-action";
import { CategoryClient } from "@/routes/dashboard/category/_components/client";
import { CategoryColumn } from "@/routes/dashboard/category/_components/column";
import { CategoryResponse } from "@/types/category.type";
import { useLoaderData } from "react-router-dom";
import { MetaResponse } from "@/types/user.type";

const breadcrumbs = [{ label: "Pages", link: "/" }, { label: "Category" }];

function DashboardCategoryPage() {
  const { meta, categories }: { meta: MetaResponse, categories: CategoryResponse[] } = useLoaderData() as any;

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id!,
    name: item.name,
    alias: item.alias,
    level: item.level,
    date: format(new Date(item.createdAt!), "MMM do, yyyy"),
    status: item.isDeleted,
  }));

  return (
    <div>
      <HeaderAction data={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <CategoryClient data={formattedCategories} meta={meta} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCategoryPage;
