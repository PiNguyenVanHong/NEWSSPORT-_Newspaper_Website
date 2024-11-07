import Image from "@/assets/login/3.jpg";

import { AlignJustify, ArrowUpRight, Dot, Share, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const options = [
  { label: "time", url: "/" },
  { label: "category", url: "/" },
  { label: "sort", url: "/" },
  // { label: "culture", url: "/" },
  // { label: "lifestyle", url: "/" },
];

const visibles = [
  { label: "All news", url: "/" },
  { label: "Climate", url: "/" },
  { label: "Tech", url: "/" },
  { label: "Science", url: "/" },
  { label: "UK", url: "/" },
  { label: "Crisis", url: "/" },
  { label: "Bussiness", url: "/" },
  { label: "Global Development ", url: "/" },
];

function SearchPage() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="border-b-2 border-gray-300 grid grid-cols-12">
        <div className="col-span-3 flex items-center gap-6 pt-2 pb-6">
          <AlignJustify />
          <span className="font-medium">More options</span>
        </div>
        <div className="col-span-9 flex gap-20 items-center">
          {options.map((item, index) => (
            <div
              key={index}
              className={cn(
                "capitalize font-medium pt-2 pb-6",
                index === 0 && "border-b-2 border-red-500"
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12 items-stretch my-8">
        <div className="col-span-6"></div>
        <div className="col-span-6 grid grid-cols-4 items-stretch gap-y-4">
          {visibles.map((item, index) => (
            <div key={index}>
              <span
                className={cn(
                  index === 0 &&
                    "bg-[#333] text-white rounded-full py-0.5 px-2.5"
                )}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 border-b border-foreground">
        <div className="flex items-center gap-2 capitalize font-medium text-base">
          <button className="text-foreground-red">Trending</button>
          <div>|</div>
          <button>Latest</button>
        </div>
        <h2 className="text-8xl italic">Headline news</h2>
      </div>
      <div className="w-full mt-10 flex flex-col gap-4">
        <div className="h-[500px]">
          <img src={Image} alt="" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="border border-foreground py-1 px-3 capitalize font-medium rounded-full">
              Bussiness
            </span>
            <span className="border border-foreground-red bg-foreground-red text-white py-1 px-3 font-medium rounded-full">
              Top news
            </span>
          </div>
          <button className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-300">
            <Share2 className="text-gray-500" size={18} />
          </button>
        </div>
        <div className="grid grid-cols-12 items-stretch">
          <h2 className="col-span-8 text-4xl">
            Aia-Pacific markets rise after Wall Street saw gains on optimism led
            by regional banks
          </h2>
          <div className="col-span-4 flex items-start justify-end">
            <button className="bg-foreground text-white px-6 py-2 rounded-full hover:opacity-80 transition-colors">
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-500 font-medium">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={Image} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-foreground">By PiKayQi</div>
          </div>
          <div className="flex items-center gap-2">
            <span>125K views</span>
            <Dot size={18} />
            <span>20m ago</span>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 items-stretch gap-4 mt-10">
        <div className="w-full flex flex-col gap-4">
          <div className="h-80">
            <img src={Image} alt="" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="border border-foreground py-1 px-3 capitalize font-medium rounded-full">
                Bussiness
              </span>
              <span className="border border-foreground-red bg-foreground-red text-white py-1 px-3 font-medium rounded-full">
                Top news
              </span>
            </div>
            <button className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-300">
              <Share2 className="text-gray-500" size={18} />
            </button>
          </div>
          <h2 className="col-span-8 text-4xl">
            Aia-Pacific markets rise after Wall Street saw gains on optimism led
            by regional banks
          </h2>
          <div className="flex flex-row-reverse items-center justify-between text-gray-500 font-medium">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={Image} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-foreground">By PiKayQi</div>
            </div>
            <div className="flex items-center gap-2">
              <span>125K views</span>
              <Dot size={18} />
              <span>20m ago</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch justify-between">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="grid grid-cols-2 items-stretch gap-6">
              <div className="h-44">
                <img src={Image} alt="" />
              </div>
              <div className="h-full flex flex-col items-start justify-between">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-foreground py-1 px-3 capitalize font-medium rounded-full">
                      Bussiness
                    </span>
                    {/* <span className="border border-foreground-red bg-foreground-red text-white py-1 px-3 font-medium rounded-full">
                    Top news
                  </span> */}
                  </div>
                  <h2 className="col-span-8 text-2xl line-clamp-4 leading-6">
                    Aia-Pacific markets rise after Wall Street saw gains on
                    optimism led by regional banks
                  </h2>
                </div>
                <div className="w-full flex items-center justify-between text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span>125K views</span>
                    <Dot size={18} />
                    <span>20m ago</span>
                  </div>
                  <button className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-300">
                    <Share2 className="text-gray-500" size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-20">
        <Button variant={"default"} className="border border-foreground py-2 px-4 capitalize font-medium rounded-full">
          More news
        </Button>
      </div>
    </div>
  );
}

export default SearchPage;
