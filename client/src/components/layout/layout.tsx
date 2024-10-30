import { Outlet } from "react-router-dom";

import Footer from "@/components/footer";
import Header from "@/components/header";
import TransitionPage from "@/routes/transition-page";

function LayoutPage() {
  return (
    <TransitionPage>
      <Header />
      <Outlet />
      <Footer />
    </TransitionPage>
  );
}

export default LayoutPage;
