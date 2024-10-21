import Image from "@/assets/news/1.jpg";

import { ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDatePublish } from "@/lib/format";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const articles = [
  {
    id: 1,
    title:
      "White House on defensive as Manchin raises concerns about new spending",
    description:
      "No matter the eventual outcome, there was little sign that the negotiators would achive the kind of sweeping deal to battle back warming that would satisfy the demands of youth activists.",
    thumbnail: Image,
    author: [
      { id: "author-01", name: "PiKayQi" },
      { id: "author-02", name: "Tuan" },
    ],
    publishedAt: new Date(Date.now() - 10000),
  },
  {
    id: 2,
    title:
      "White House on defensive as Manchin raises concerns about new spending",
    description:
      "No matter the eventual outcome, there was little sign that the negotiators would achive the kind of sweeping deal to battle back warming that would satisfy the demands of youth activists.",
    thumbnail: Image,
    author: [{ id: "author-01", name: "PiKayQi" }],
    publishedAt: new Date(Date.now() - 10000),
  },
  {
    id: 3,
    title:
      "White House on defensive as Manchin raises concerns about new spending",
    description:
      "No matter the eventual outcome, there was little sign that the negotiators would achive the kind of sweeping deal to battle back warming that would satisfy the demands of youth activists.",
    thumbnail: Image,
    author: [
      { id: "author-01", name: "PiKayQi" },
      { id: "author-02", name: "Tuan" },
    ],
    publishedAt: new Date(Date.now() - 10000),
  },
];

const keywords = [
  {
    id: "keyword-01",
    ranking: 1,
    content:
      "Contract lawyers face a growing invasion of surveillance programs that monitor their work.",
  },
  {
    id: "keyword-02",
    ranking: 2,
    content:
      "Hawley claims American manhood is broken. Where are his solutions?",
  },
  {
    id: "keyword-03",
    ranking: 3,
    content:
      "Hawley claims American manhood is broken. Where are his solutions?",
  },
  {
    id: "keyword-04",
    ranking: 4,
    content:
      "Hawley claims American manhood is broken. Where are his solutions?",
  },
  {
    id: "keyword-05",
    ranking: 5,
    content:
      "In Travis Scott's old neighborhood, residents rechink his status as a hometown hero",
  },
];

function Homepage() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-8 items-stretch my-6">
        <div className="col-span-1">
          {articles.map((item, index) => (
            <div
              className={cn(
                "flex flex-col gap-4 py-4",
                index != 0 && "border-t-2 border-gray-300"
              )}
            >
              <h2>{item.title}</h2>
              <div className="line-clamp-5 text-foreground-gray font-normal">
                {item.description}
              </div>
              <div className="flex flex-col gap-0.5 text-foreground-gray font-medium">
                {item.author.length > 1 ? (
                  <div className="flex gap-1.5 items-center">
                    By
                    {item.author.map((au, index) => {
                      return (
                        <>
                          {index != 0 && <span>and</span>}
                          <span className="text-foreground-red">{au.name}</span>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    By{" "}
                    <span className="text-foreground-red">
                      {item.author[0].name}
                    </span>
                  </div>
                )}
                <div className="text-foreground-gray font-medium">
                  {formatDatePublish(item.publishedAt)}
                </div>
              </div>
            </div>
          ))}
          <div className="border-2 border-gray-300 p-4">
            <div className="flex items-start justify-between">
              <h4 className="font-playfair text-2xl font-bold">
                Subscribe <br /> Our Newsletter
              </h4>
              <Mail className="text-gray-400/60" size={26} />
            </div>
            <div className="mt-2 flex items-end gap-2">
              <input
                type="email"
                name="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-foreground-red focus:outline-none focus:ring-0 focus:border-foreground-red peer"
                placeholder="Enter your email here"
                required
              />
              <button className="p-1.5 bg-foreground-red text-white rounded-full">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2 h-full border-2 border-gray-300 p-4">
          <div className="h-full flex flex-col items-center justify-between">
            <div className="h-full flex flex-col justify-between">
              <div className="h-96 relative">
                <img className="object-cover" src={Image} alt="" />
                <span className="absolute top-5 left-0 uppercase text-white px-4 py-1.5 bg-foreground-red">
                  Main Match
                </span>
              </div>
              <h2 className="text-3xl font-semibold font-playfair line-clamp-3 leading-8">
                House Democrats introduce resolution to censure Rep. Gosar over
                animated video that depicted him killing Rep. Ocasio-Cortez
                dasdasdas sdasdsa asdasd asda ssdasd asd a d asdasd
              </h2>
              <div className="text-foreground-gray font-normal">
                No matter the eventual outcome, there was little sign that the
                negotiators would achive the kind of sweeping deal to battle
                back warming that would satisfy the demands of youth activists.
              </div>
              <div className="flex items-center justify-between text-foreground-gray font-medium">
                <div>
                  By <span className="text-foreground-red">PiKayQi</span> and
                  <span className="text-foreground-red"> Tuan</span>
                </div>
                <div>{formatDatePublish(new Date(Date.now() - 30000))}</div>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-6">
              <div className="grid grid-cols-6 gap-4 pt-6 border-t-2 border-gray-300">
                <div className="col-span-2">
                  <img className="object-cover" src={Image} alt="" />
                </div>
                <div className="col-span-4 flex flex-col gap-2">
                  <h2>
                    White House on defensive as Manchin raises concerns about
                    new spending
                  </h2>
                  <div className="line-clamp-2 text-foreground-gray font-normal">
                    No matter the eventual outcome, there was little sign that
                    the negotiators would achive the kind of sweeping deal to
                    battle back warming that would satisfy the demands of youth
                    activists.
                  </div>
                  <div className="flex items-center justify-between text-foreground-gray font-medium">
                    <div>
                      By <span className="text-foreground-red">PiKayQi</span>{" "}
                      and
                      <span className="text-foreground-red"> Tuan</span>
                    </div>
                    <div>{formatDatePublish(new Date(Date.now() - 30000))}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4 pt-6 border-t-2 border-gray-300">
                <div className="col-span-2">
                  <img className="object-cover" src={Image} alt="" />
                </div>
                <div className="col-span-4 flex flex-col gap-2">
                  <h2>
                    White House on defensive as Manchin raises concerns about
                    new spending
                  </h2>
                  <div className="line-clamp-2 text-foreground-gray font-normal">
                    No matter the eventual outcome, there was little sign that
                    the negotiators would achive the kind of sweeping deal to
                    battle back warming that would satisfy the demands of youth
                    activists.
                  </div>
                  <div className="flex items-center justify-between text-foreground-gray font-medium">
                    <div>
                      By <span className="text-foreground-red">PiKayQi</span>{" "}
                      and
                      <span className="text-foreground-red"> Tuan</span>
                    </div>
                    <div>{formatDatePublish(new Date(Date.now() - 30000))}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-between">
          <Tabs defaultValue="trending-topic" className="w-full">
            <TabsList>
              <TabsTrigger
                className="uppercase font-semibold"
                value="trending-topic"
              >
                Trending Topic
              </TabsTrigger>
              <TabsTrigger
                className="uppercase font-semibold"
                value="latest-update"
              >
                Latest update
              </TabsTrigger>
            </TabsList>
            <TabsContent value="trending-topic">
              {keywords.map((item, index) => (
                <div className="flex items-stretch gap-4 py-5 border-b-2 border-gray-300">
                  <div className="text-foreground-gray font-second">
                    <span className="text-xl font-bold">#</span>
                    <span className="text-5xl leading-7">{item.ranking}</span>
                  </div>
                  <h3 className="line-clamp-4">{item.content}</h3>
                </div>
              ))}
            </TabsContent>
            <TabsContent
              className="border border-foreground-gray"
              value="latest-update"
            >
              Change your password here.
            </TabsContent>
          </Tabs>
          <div className="flex flex-col gap-2">
            <div>
              <img src={Image} alt="" />
            </div>
            <h3>
              Hawley claims American manhood is broken. Where are his solutions?
            </h3>
            <div className="text-foreground-gray font-medium">
              <span>By</span>
              <span className="text-foreground-red"> PiKayQi</span>
              <span> and</span>
              <span className="text-foreground-red"> Tuan</span>
            </div>
            <div className="text-foreground-gray font-medium">
              {formatDatePublish(new Date(Date.now() - 50000))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold uppercase truncate">
            More top sotires
          </h1>
          <div className="flex-1 h-0.5 bg-foreground rounded-full"></div>
        </div>
        <div className="grid grid-cols-3 gap-8 items-stretch justify-start mt-10">
          <div className="col-span-1 flex flex-col justify-between">
            <div className="h-60 relative">
              <img src={Image} alt="" />
              <span className="absolute top-5 left-0 uppercase text-white px-4 py-1.5 bg-foreground-red">
                Trending topic
              </span>
            </div>
            <h2 className="text-3xl leading-7">
              White House on defensive as Manchin raises concerns about new
              spending
            </h2>
            <div className="line-clamp-5 text-foreground-gray font-normal">
              No matter the eventual outcome, there was little sign that the
              negotiators would achive the kind of sweeping deal to battle back
              warming that would satisfy the demands of youth activists.
            </div>
            <div className="flex items-center justify-between text-foreground-gray font-medium">
              <div>
                By <span className="text-foreground-red">PiKayQi</span> and
                <span className="text-foreground-red"> Tuan</span>
              </div>
              <div>{formatDatePublish(new Date(Date.now() - 30000))}</div>
            </div>
          </div>
          <div className="col-span-2 flex items-stretch">
            <div className="pr-6 border-r-2 border-gray-300 basis-1/2 flex flex-col gap-6">
              <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-300">
                <h2>
                  White House on defensive as Manchin raises concerns about new
                  spending
                </h2>
                <div className="basis-4/5">
                  <img src={Image} alt="" />
                </div>
              </div>
              <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-300">
                <h2>
                  White House on defensive as Manchin raises concerns about new
                  spending
                </h2>
                <div className="basis-4/5">
                  <img src={Image} alt="" />
                </div>
              </div>
              <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-300">
                <h2>
                  White House on defensive as Manchin raises concerns about new
                  spending
                </h2>
                <div className="basis-4/5">
                  <img src={Image} alt="" />
                </div>
              </div>
              <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-300">
                <h2>
                  White House on defensive as Manchin raises concerns about new
                  spending
                </h2>
                <div className="basis-4/5">
                  <img src={Image} alt="" />
                </div>
              </div>
            </div>
            <div className="pl-6 basis-1/2 flex flex-col justify-between">
              <div className="h-60">
                <img src={Image} alt="" />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-foreground-gray font-medium">
                  {formatDatePublish(new Date(Date.now() - 30000))}
                </div>
                <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                  Sports
                </div>
              </div>
              <h2 className="text-3xl leading-7">
                White House on defensive as Manchin raises concerns about new
                spending
              </h2>
              <div className="line-clamp-5 text-foreground-gray font-normal">
                No matter the eventual outcome, there was little sign that the
                negotiators would achive the kind of sweeping deal to battle
                back warming that would satisfy the demands of youth activists.
              </div>
              <div className="flex items-center justify-between text-foreground-gray font-medium">
                <div>
                  By <span className="text-foreground-red">PiKayQi</span> and
                  <span className="text-foreground-red"> Tuan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold uppercase truncate">
            More top soccers
          </h1>
          <div className="flex-1 h-0.5 bg-foreground rounded-full"></div>
        </div>
        <div className="grid grid-cols-4 gap-6 items-stretch justify-start mt-10">
          <div className="col-span-1 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="h-52">
                <img src={Image} alt="" />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-foreground-gray font-medium">
                  {formatDatePublish(new Date(Date.now() - 30000))}
                </div>
                <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                  Sports
                </div>
              </div>
              <h2 className="text-3xl leading-8">
                White House on defensive as Manchin raises concerns about new
                spending
              </h2>
              <div className="flex items-center justify-between text-foreground-gray font-medium">
                <div>
                  By <span className="text-foreground-red">PiKayQi</span> and
                  <span className="text-foreground-red"> Tuan</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-52">
                <img src={Image} alt="" />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-foreground-gray font-medium">
                  {formatDatePublish(new Date(Date.now() - 30000))}
                </div>
                <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                  Sports
                </div>
              </div>
              <h2 className="text-3xl leading-8">
                White House on defensive as Manchin raises concerns about new
                spending
              </h2>
              <div className="flex items-center justify-between text-foreground-gray font-medium">
                <div>
                  By <span className="text-foreground-red">PiKayQi</span> and
                  <span className="text-foreground-red"> Tuan</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 border-l-2 border-r-2 border-gray-300 px-4 flex flex-col gap-4">
            {[...Array(5)].map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-stretch gap-4",
                  index != 0 && "pt-4 border-t-2 border-gray-300"
                )}
              >
                <div className="basis-1/2 flex flex-col justify-between">
                  <h2 className="line-clamp-3">
                    White House on defensive as Manchin raises concerns about
                    new spending
                  </h2>
                  <div className="text-foreground-gray font-normal line-clamp-3">
                    No matter the eventual outcome, there was little sign that
                    the negotiators would achive the kind of sweeping deal to
                    battle back warming that would satisfy the demands of youth
                    activists.
                  </div>
                  <div className="flex items-center justify-between text-foreground-gray font-medium">
                    <div>
                      By <span className="text-foreground-red">PiKayQi</span>{" "}
                      and
                      <span className="text-foreground-red"> Tuan</span>
                    </div>
                    <div>{formatDatePublish(new Date(Date.now() - 30000))}</div>
                  </div>
                </div>
                <div className="h-40">
                  <img src={Image} alt="" />
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1 flex flex-col justify-between">
            {[...Array(7)].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 pb-4 border-b-2 border-gray-300"
              >
                <h3 className="flex-1">
                  White House on defensive as Manchin raises concerns about new
                  spending
                </h3>
                <div className="w-32">
                  <img src={Image} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold uppercase truncate">
            More top sotires
          </h1>
          <div className="flex-1 h-0.5 bg-foreground rounded-full"></div>
        </div>
        <div className="grid grid-cols-3 gap-8 items-stretch justify-start mt-10">
          {[...Array(3)].map((item, index) => (
            <div key={index} className="col-span-1 flex flex-col gap-4">
              <div className="h-56">
                <img src={Image} alt="" />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-foreground-gray font-medium">
                  {formatDatePublish(new Date(Date.now() - 30000))}
                </div>
                <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                  Sports
                </div>
              </div>
              <h2>
                White House on defensive as Manchin raises concerns about new
                spending
              </h2>
              <div className="text-foreground-gray font-normal line-clamp-4 h-20">
                No matter the eventual outcome, there was little sign that the
                negotiators would achive the kind of sweeping deal to battle
                back warming that would satisfy the demands of youth activists.
              </div>
              <div className="text-foreground-gray font-medium">
                By <span className="text-foreground-red">Tuan </span>
                and <span className="text-foreground-red">PiKayQi</span>
              </div>
            </div>
          ))}
          <div className="col-span-3 grid grid-cols-4 items-stretch gap-10 border-y-2 border-gray-300 py-8">
            {[...Array(4)].map((item, index) => (
              <div className="flex items-start gap-2">
                <div className="w-20 h-20">
                  <img src={Image} alt="" />
                </div>
                <h3 className="flex-1 leading-5">
                  White House on defensive as Manchin raises concerns about new
                  spending
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
