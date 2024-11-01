import HeaderAction from "@/components/dashboard/header-action";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function DashboardCreateArticlePage() {
  const breadcrumbs = [
    { label: "Pages", link: "/" },
    { label: "Article", link: "/dashboard/articles" },
    { label: "Create" },
  ];

  const [content, setContent] = useState("");

  const onChange = (data: string) => {
    setContent(data);
  }

  const onClick = () => {
    console.log(JSON.parse(content));
  }

  return (
    <div className="w-full min-h-svh">
      <HeaderAction data={breadcrumbs} />
      <div className="h-full flex flex-1 flex-col gap-4 p-4 pt-0">
        <h3>Create Article</h3>
        <span>Check the sales, value and bounce rate by country</span>
        <Button className="w-20" onClick={onClick}>
          Click me
        </Button>
        <div className="flex flex-1 flex-col gap-4 px-4 py-4">
          <Editor
            onChange={onChange}
            initialContent={undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardCreateArticlePage;
