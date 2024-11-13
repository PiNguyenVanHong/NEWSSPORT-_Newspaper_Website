"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/heading";
import { DataTable } from "@/components/table/data-table";
import { categories, isTopHeading } from "@/routes/dashboard/top-heading/_components/data";
import { TopHeadingColumn, columns } from "./column";
import { MetaResponse } from "@/types/user.type";

interface TopHeadingClientProps {
  data: TopHeadingColumn[];
  meta: MetaResponse;
}

export const TopHeadingClient: React.FC<TopHeadingClientProps> = ({ data, meta }) => {
  const filterData = [
    { field: "isTopHeading", options: isTopHeading },
    { field: "category", options: categories },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Top heading articles (${meta.total})`}
          description="Manage top heading articles for your website"
        />
        <Button onClick={() => {}}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="title"
        filterData={filterData}
        columns={columns}
        data={data}
        meta={meta}
      />
    </>
  );
};
