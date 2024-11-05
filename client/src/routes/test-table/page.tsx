import { z } from "zod";
import data from "@/components/table/data/task.json";
import { priorities, statuses } from "@/components/table/data/data";

import { columns } from "@/components/table/column";
import { DataTable } from "@/components/table/data-table";
import HeaderAction from "@/components/dashboard/header-action";
import { taskSchema } from "@/components/table/data/schema";
import { useEffect, useState } from "react";

async function getTasks() {

  const tasks = data;

  return z.array(taskSchema).parse(tasks);
}

function TestTablePage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const filterData = [
    { field: "status", options: statuses },
    { field: "priority", options: priorities },
  ];
  const breadcrumbs = [{ label: "Pages", link: "/" }, { label: "Category" }];

  useEffect(() => {
    const getData = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };

    getData();
  }, []);

  return (
    <div>
      <HeaderAction data={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
          <DataTable searchKey="title" filterData={filterData} data={tasks} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default TestTablePage;
