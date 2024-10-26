import { useTranslation } from "react-i18next";
import { Search, Slash } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import TransitionLink from "@/components/tranisition-link";

const menu = [
  { id: 1, label: "events", link: "/events" },
  { id: 2, label: "breaking news", link: "/breaking-news" },
  { id: 3, label: "about us", link: "/about-us" },
  { id: 4, label: "contact us", link: "/contact-us" },
];

const navbars = [
  { id: "nav-01", label: "opinion", link: "/opinion" },
  { id: "nav-02", label: "business & trends", link: "/business-trends" },
  { id: "nav-03", label: "politics", link: "/politics" },
  { id: "nav-04", label: "sports", link: "/sports" },
  { id: "nav-05", label: "style & experiences", link: "/style-experiences" },
  { id: "nav-06", label: "sustainability", link: "/sustainability" },
  { id: "nav-07", label: "academic", link: "/academic" },
  { id: "nav-08", label: "worlds of luxury", link: "/worlds-of-luxury" },
];

const Header = () => {
  const { t, i18n } = useTranslation(['header']);
  const location = useLocation();

  const { onOpen } = useModal();

  const switchLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
  };

  const handleLogin = () => {
    onOpen("login-form");
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-4">
      <div className="flex items-center justify-between text-foreground-gray uppercase font-medium text-sm">
        <div className="flex items-center gap-4">
          {menu.map((item) => (
            <TransitionLink key={item.id} href={item.link} label={item.label} className="hover:opacity-80">
            </TransitionLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div>Call us (+84) 123 456 789</div>
          <Slash className="-rotate-12" strokeWidth={4} size={10} />
          <div>hello@newsfactory.com</div>
        </div>
      </div>
      <div className="border-t-2 border-b-2 border-foreground flex items-center gap-3 mt-4">
        <div className="py-8 px-3 border-r-2 border-foreground font-medium text-sm flex gap-1">
          <button onClick={() => switchLanguage("vi")}>VN</button>
          <span>|</span>
          <button onClick={() => switchLanguage("en")}>EN</button>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-52">
            <Search size={18} />
            <input
              type="text"
              name="search"
              className="block py-1 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-foreground-red focus:outline-none focus:ring-0 focus:border-foreground-red peer"
              placeholder="what are you looking for?"
              required
            />
          </div>
          <div className="text-5xl text-center uppercase font-semibold font-second cursor-pointer">
          <TransitionLink href="/" label="News Sport+" />
          </div>
          <div className="flex items-center gap-4">
            <button className="uppercase font-semibold p-2" onClick={handleLogin}>login</button>
            <button className="py-2 px-6 bg-foreground text-white uppercase">
              subscribe and get 50% off
            </button>
          </div>
        </div>
      </div>
      <ul className="flex items-center justify-between border-b-2 border-gray-300 py-6">
        {navbars.map((item, index) => (
          <li key={item.id} className={cn("px-6 uppercase font-semibold", index != 0 && "border-l-2 border-gray-300", location.pathname === t(`header-bottom.${item.label}.link`) && "text-foreground-red")}>
            <TransitionLink href={t(`header-bottom.${item.label}.link`)} label={t(`header-bottom.${item.label}.label`)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
