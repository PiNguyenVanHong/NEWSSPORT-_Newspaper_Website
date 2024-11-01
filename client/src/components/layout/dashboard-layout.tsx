import { Outlet } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/sidebar/sidebar-dashboard";

function DashboardLayoutPage() {
  return (
    <SidebarProvider>
      <SidebarDashboard />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayoutPage;
