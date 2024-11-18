import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { ChevronDown, Search, Slash, UserRound } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { buildQueryString, cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import { AuthContext } from "@/context/auth-context";
import { AuthMeType, getMe, logout } from "@/actions/auth.api";

import TransitionLink from "@/components/tranisition-link";
// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AxiosError } from "axios";
import { getAllCategory } from "@/actions/category.api";
import { CategoryResponse } from "@/types/category.type";

const menu = [
  { id: 1, label: "events", link: "/events" },
  { id: 2, label: "breaking news", link: "/breaking-news" },
  { id: 3, label: "about us", link: "/about-us" },
  { id: 4, label: "contact us", link: "/contact-us" },
];

const Header = () => {
  const {
    userId,
    role,
    token,
    logout: logoutClient,
  }: any = useContext(AuthContext);
  const { t, i18n } = useTranslation(["header"]);
  const location = useLocation();
  const navigate = useNavigate();
  const { onOpen } = useModal();

  const [currentUser, setCurrentUser] = useState<AuthMeType | null>(null);
  const [navbars, setNavbars] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userInfo = await getMe(token);
        setCurrentUser(userInfo);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          toast.error(error?.response?.data?.message);
        } else {
          console.log(error);
          toast.error("Something went wrong!!!");
        }
      }
    };

    const getNavbar = async () => {
      try {
        const query = buildQueryString({
          filter: {},
          projection: {
            id: 1,
            name: 1,
            alias: 1,
          },
          sort: {
            level: 1,
          },
        });

        const { results } = await getAllCategory(query);

        setNavbars(results);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
          navigate("/sign-in");
        } else {
          console.log(error);
          toast.error("Something went wrong!!!");
        }
      }
    };

    getNavbar();

    if (token) {
      getUser();
    }
  }, [token]);

  const switchLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
  };

  const handleLogin = () => {
    onOpen("login-form");
  };

  const handleLogout = async () => {
    try {
      const { message } = await logout(userId, token);

      logoutClient();
      toast.success(message);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    (e.target as HTMLInputElement).value = "";

    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-4">
      <div className="flex items-center justify-between text-foreground-gray uppercase font-medium text-sm">
        <div className="flex items-center gap-4">
          {menu.map((item) => (
            <TransitionLink
              key={item.id}
              href={item.link}
              label={item.label}
              className="hover:opacity-80"
            ></TransitionLink>
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
          <div className="max-w-80 flex items-center gap-2 min-w-52">
            <Search size={18} />
            <input
              type="text"
              name="search"
              className="block py-1 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-foreground-red focus:outline-none focus:ring-0 focus:border-foreground-red peer"
              placeholder="what are you looking for?"
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              required
            />
          </div>
          <div className="flex-1 text-5xl text-center uppercase font-semibold font-second cursor-pointer">
            <TransitionLink href="/" label="News Sport+" />
          </div>
          <div className="max-w-80 flex items-center gap-4">
            {currentUser ? (
              <>
                <button className="py-2 px-6 bg-foreground text-white uppercase">
                  subscribe for more
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="gap-2 flex items-center p-2">
                      <UserRound size={18} />
                      <span className="capitalize font-medium">
                        {currentUser.firstName}
                      </span>
                      <ChevronDown />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    {(role === "ADMIN" || role === "WRITER") && (
                      <>
                        <DropdownMenuItem>
                          <Link to={"/dashboard"}>Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TransitionLink
                            href={"/favorites"}
                            label="Favorites"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <button
                  className="uppercase font-semibold p-2"
                  onClick={handleLogin}
                >
                  login
                </button>
                <button className="py-2 px-6 bg-foreground text-white uppercase">
                  subscribe and get 50% off
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ul className="flex items-center justify-between border-b-2 border-gray-300 py-6">
        {navbars.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "px-6 uppercase font-semibold",
              index != 0 && "border-l-2 border-gray-300",
              location.pathname === t(`header-bottom.${item.name}.link`) &&
                "text-foreground-red"
            )}
          >
            <TransitionLink
              href={t(`header-bottom.${item.name}.link`)}
              label={t(`header-bottom.${item.name}.label`)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
