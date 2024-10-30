import { Outlet } from "react-router-dom";
import AuthCarousel from "@/components/auth/auth-carousel";

function AuthLayoutPage() {
  return (
    <div className="p-2 w-full h-full max-h-screen">
      <div className="grid grid-cols-2 items-center">
        <div className="col-span-1 h-auto">
          <AuthCarousel />
        </div>
        <div className="col-span-1">
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayoutPage;
