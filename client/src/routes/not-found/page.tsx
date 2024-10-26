import { useEffect } from "react";
import { animatePageIn } from "@/lib/animations";

function NotFoundPage() {
  useEffect(() => {
    animatePageIn();
  }, []);

  return <div>404 Page</div>;
}

export default NotFoundPage;
