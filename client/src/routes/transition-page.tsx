import { animatePageIn } from "@/lib/animations";
import { useEffect } from "react";

export default function TransitionPage({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        id="banner-1"
        className="w-1/4 min-h-screen bg-background z-10 fixed top-0 left-0"
      />
      <div
        id="banner-2"
        className="w-1/4 min-h-screen bg-background z-10 fixed top-0 left-1/4"
      />
      <div
        id="banner-3"
        className="w-1/4 min-h-screen bg-background z-10 fixed top-0 left-2/4"
      />
      <div
        id="banner-4"
        className="w-1/4 min-h-screen bg-background z-10 fixed top-0 left-3/4"
      />
      {children}
    </div>
  );
}
