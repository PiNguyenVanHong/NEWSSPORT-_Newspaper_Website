import Logo from "@/assets/logo.png";

import { MoveRight, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const socials = [
  { id: 1, name: "Facebook", link: "/" },
  { id: 2, name: "Twitter", link: "/" },
  { id: 3, name: "Instagram", link: "/" },
  { id: 4, name: "Pinterest", link: "/" },
  { id: 5, name: "Linkedin", link: "/" },
  { id: 6, name: "Youtube", link: "/" },
];

const Footer = () => {
  return (
    <div className="w-full max-w-7xl mx-auto border border-foreground-gray my-10">
      <div className="flex items-center gap-28 p-10">
        <h2 className="text-4xl font-extrabold text-foreground-red uppercase">
          Subscribe to our newsletters
        </h2>
        <div className="relative flex-1 z-0 mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 pr-8 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-foreground-gray appearance-none dark:text-white dark:border-gray-600 dark:focus:border-foreground-red focus:outline-none focus:ring-0 focus:border-foreground-red peer"
            placeholder=" "
            required
          />
          <MoveRight className="absolute right-0 bottom-2 peer-focus:text-foreground-red transition-colors duration-300" />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-foreborder-foreground-red peer-focus:dark:text-foreground-red peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
      </div>
      <div className="grid grid-cols-3 items-stretch">
        <div className="border-t border-foreground-gray flex flex-col items-center justify-center gap-4">
          <div className="w-52">
            <img src={Logo} alt="" />
          </div>
          <div className="text-foreground-gray uppercase px-24 font-medium text-justify">
            The leading source for Sport news & Sport event coverage
          </div>
        </div>
        <div className="border-l border-t border-foreground-gray py-10 flex flex-col items-center">
          <ul className="flex flex-col gap-2">
            <h5 className="mb-6 uppercase font-medium text-base">News Media</h5>
            <li>
              <Link to={"/about-us"} className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to={"/about-us"} className="hover:underline">
                Accessibility
              </Link>
            </li>
            <li>
              <Link to={"/about-us"} className="hover:underline">
                Advertise
              </Link>
            </li>
            <li>
              <Link to={"/about-us"} className="hover:underline">
                PMC Fashion & Luxury
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-l border-t border-foreground-gray py-10 flex flex-col items-center">
          <ul className="flex flex-col gap-2">
            <h5 className="mb-6 uppercase font-medium text-base">Legal</h5>
            <li>
              <Link to={"/about-us"} className="hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to={"/about-us"} className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={"/about-us"} className="hover:underline">
                AdChoices
              </Link>
            </li>
            <li>
              <Link to={"/about-us"} className="hover:underline">
                EU Privacy Preferences
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-t border-foreground-gray flex flex-col items-center justify-center">
          <button className="w-fit text-foreground-red text-2xl font-medium uppercase flex items-center gap-4">
            <span>send us a tip</span>
            <MoveUpRight />
          </button>
        </div>
        <div className="col-span-2 border-l border-t border-foreground-gray flex items-center justify-center">
          <ul className="flex items-center gap-6 my-4">
            {socials.map((item) => (
              <li key={item.id}>
                <Button className="font-normal" variant={"link"}>
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
