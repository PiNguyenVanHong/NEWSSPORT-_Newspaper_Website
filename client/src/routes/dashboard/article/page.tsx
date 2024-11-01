import HeaderAction from "@/components/dashboard/header-action";

function DashboardArticlePage() {
    const breadcrumbs = [{ label: "Pages", link: "/" }, { label: "Article" }];

  return (
    <div>
      <HeaderAction data={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h3>Article</h3>
        <span>Check the sales, value and bounce rate by country</span>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </div>
  );
}

export default DashboardArticlePage;
