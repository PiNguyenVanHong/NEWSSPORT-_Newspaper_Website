import Image from "@/assets/login/3.jpg";

import { AlignJustify, ArrowUpRight, Dot, Filter, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoaderData } from "react-router-dom";
import { formatDatePublish, formatUrlImage } from "@/lib/format";
import { ArticleResponse } from "@/types/article.type";
import { MetaResponse } from "@/types/user.type";

const options = [
  {
    label: "time",
    url: "/",
    content: [
      { label: "All news", value: "/" },
      { label: "A day ago", value: "/" },
      { label: "A week ago", value: "/" },
      { label: "A month ago", value: "/" },
      { label: "Six months ago", value: "/" },
      { label: "A year ago", value: "/" },
    ],
  },
  {
    label: "category",
    url: "/",
    content: [
      { label: "Category", value: "/" },
      { label: "Climate", value: "/" },
      { label: "Tech", value: "/" },
      { label: "Science", value: "/" },
      { label: "UK", value: "/" },
      { label: "Crisis", value: "/" },
      { label: "Bussiness", value: "/" },
      { label: "Global Development ", value: "/" },
    ],
  },
  {
    label: "sort",
    url: "/",
    content: [
      { label: "Sort", value: "/" },
      { label: "Climate", value: "/" },
      { label: "Tech", value: "/" },
      { label: "Science", value: "/" },
      { label: "UK", value: "/" },
      { label: "Crisis", value: "/" },
      { label: "Bussiness", value: "/" },
      { label: "Global Development ", value: "/" },
    ],
  },
  { label: "", url: "/" },
  { label: "", url: "/" },
  { label: "", url: "/" },
  { label: "", url: "/" },
  { label: "", url: "/" },
  { label: "", url: "/" },
  { label: "", url: "/" },
  { label: "", url: "/" },
];

function SearchPage() {
  const {
    q,
    meta,
    results,
  }: { q: string; meta: MetaResponse; results: ArticleResponse[] } =
  useLoaderData() as any;

  const [active, setActive] = useState(true);
  const [search, setSearch] = useState<string>(q);
  const [contentOptions, setContentOptions] = useState<any>(options[0]);

  const handleOpenOptions = (item: any) => {
    if (contentOptions?.label === item.label) {
      setActive(!active);
      return;
    }

    setActive(false);

    setTimeout(() => {
      setContentOptions(item);
      setActive(true);
    }, 500);
  };

  const handleFilter = () => {
    console.log(search);
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-12">
        <div className="border-b-2 border-gray-300 col-span-3 flex items-center gap-6 pt-2 pb-6">
          <AlignJustify />
          <span className="font-medium">More options</span>
        </div>
        <div className="col-span-9 flex items-center">
          {options.map((item, index) => (
            <button
              key={index}
              className={cn(
                "h-full capitalize font-medium pt-2 pb-6 px-10 border-b-2 border-gray-300 transition-all duration-300",
                item.label === contentOptions.label &&
                  "border-b-2 border-red-500",
                index === options.length - 1 && "pr-0"
              )}
              onClick={() => handleOpenOptions(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12 items-stretch">
        <div className="col-span-6 mt-5 ml-1">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              className="bg-white"
              type="text"
              placeholder="Search something..."
              value={search}
              onChange={(e) => (
                setSearch(e.target.value)
              )}
            />
            <Button type="submit" onClick={handleFilter}>
              <Filter />
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "col-span-6 grid grid-cols-4 items-stretch max-h-0 min-w-[250px] opacity-0 overflow-hidden gap-y-4 transition-all duration-500",
            active && "opacity-100 max-h-[700px] my-6 py-1"
          )}
        >
          {contentOptions.content.map((item: any, index: number) => (
            <div key={index} className="cursor-pointer">
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
      {results.length <= 0 ? (
        <div>404 not found</div>
      ) : (
        <>
          <div className="w-full mt-10 flex flex-col gap-4">
            <div className="h-[500px]">
              <img src={formatUrlImage(results[0]?.thumbnail!)} alt="" />
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
                {results[0]?.title}
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
                <span>{formatDatePublish(new Date(results[0].createdAt!))}</span>
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
                Aia-Pacific markets rise after Wall Street saw gains on optimism
                led by regional banks
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
                <div
                  key={index}
                  className="grid grid-cols-2 items-stretch gap-6"
                >
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
            <Button
              variant={"default"}
              className="border border-foreground py-2 px-4 capitalize font-medium rounded-full"
            >
              More news
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;
