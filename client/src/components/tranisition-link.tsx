import { useLocation, useNavigate } from "react-router-dom";
import { animatePageOut } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TransitionLinkProps {
  href: string;
  label: string;
  className?: string;
}

const TransitionLink = ({ href, label, className }: TransitionLinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== href) {
      animatePageOut(href, navigate);
    }
  };

  return (
    <span className={cn("cursor-pointer", className)} onClick={handleClick}>
      {label}
    </span>
  );
};

export default TransitionLink;
