"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/heading";
import { ApiList } from "@/components/api-list";
import { DataTable } from "@/components/table/data-table";
import { statuses } from "./data";
import { ArticleColumn, columns } from "./column";

interface ArticleClientProps {
    data: ArticleColumn[];
}

export const ArticleClient: React.FC<ArticleClientProps> = ({
    data
}) => {

    const filterData = [
        { field: "status", options: statuses }
    ];

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading  
                    title={`Articles (${data.length})`}
                    description="Manage articles for your store"
                />
                <Button onClick={() => {}}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="title" filterData={filterData} columns={columns} data={data} />
            <Heading title="API" description="API calls for Articles" />
            <Separator />
            <ApiList entityName="articles" entityIdName="categoryId" />
        </>
    );
};