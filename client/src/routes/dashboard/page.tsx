import { ContentTemp } from "@/components/dashboard/content-temp";
import HeaderAction from "@/components/dashboard/header-action";
import { ChartCircle01 } from "@/components/dashboard/options/circle-01";
import { ChartCircle02 } from "@/components/dashboard/options/circle-02";
import { ChartCircle03 } from "@/components/dashboard/options/circle-03";

function DashboardPage() {
  const breadcrumbs = [{ label: "Pages", link: "/" }, { label: "Dashboard" }];

  return (
    <div>
      <HeaderAction data={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h3>Dashboard</h3>
        <span>Check the sales, value and bounce rate by country</span>
        <div className="w-full grid grid-cols-3 items-start gap-6 mb-4">
          <ChartCircle02 />
          <ChartCircle01 />
          <ChartCircle03 />
        </div>
          <ContentTemp />
      </div>
    </div>
  );
}

export default DashboardPage;
