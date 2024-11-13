"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, columns } from "@/routes/dashboard/category/_components/column";
import { Heading } from "@/components/heading";
import { ApiList } from "@/components/api-list";
import { DataTable } from "@/components/table/data-table";
import { statuses } from "./data";
import { MetaResponse } from "@/types/user.type";

interface CategoryClientProps {
    data: CategoryColumn[];
    meta: MetaResponse;
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data,
    meta
}) => {

    const filterData = [
        { field: "status", options: statuses }
    ];

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading  
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store"
                />
                <Button onClick={() => {}}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" filterData={filterData} columns={columns} data={data} meta={meta} />
            {/* <Heading title="API" description="API calls for Categories" />
            <Separator /> */}
            {/* <ApiList entityName="categories" entityIdName="categoryId" /> */}
        </>
    );
};