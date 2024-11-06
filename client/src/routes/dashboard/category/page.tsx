import { format } from "date-fns";

import HeaderAction from "@/components/dashboard/header-action";
import { CategoryClient } from "@/routes/dashboard/category/_components/client";
import { CategoryColumn } from "@/routes/dashboard/category/_components/column";
import { CategoryResponse } from "@/types/category.type";
import { useEffect, useState } from "react";
import { getAllCategory } from "@/actions/category.api";
import { buildQueryString } from "@/lib/utils";

const breadcrumbs = [{ label: "Pages", link: "/" }, { label: "Category" }];

function DashboardCategoryPage() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
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

    const getData = async () => {
      const { results } = await getAllCategory(query);

      setCategories(results);
    };

    getData();
  }, []);

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
          <CategoryClient data={formattedCategories} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCategoryPage;
