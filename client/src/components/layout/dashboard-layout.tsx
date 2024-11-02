import { Outlet, useNavigate } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/sidebar/sidebar-dashboard";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";
import { decodedToken } from "@/lib/utils";

function DashboardLayoutPage() {
  const { token }: any = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) navigate("/404");

    const checkUser = async () => {
      const { role }: any = decodedToken(token);
      if(role !== "ADMIN") navigate("/404");
    } 

    checkUser();
  }, []);

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
