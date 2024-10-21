import { Outlet } from "react-router-dom";

import Footer from "@/components/footer";
import Header from "@/components/header";

function LayoutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LayoutPage;
