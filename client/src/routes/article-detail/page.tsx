import Image from "@/assets/news/1.jpg";

import { useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animatePageIn } from "@/lib/animations";
import { formatDatePublish, formatDateBasis, formatUrlImage, formatDateInTimeZone } from "@/lib/format";
import BreadcrumbCustom from "@/components/breadcumb-custom";
import { ArticleResponse } from "@/types/article.type";
import ContentArticle from "@/components/article/content";

const socials = [
  { id: 1, name: "Facebook", link: "/" },
  { id: 2, name: "Twitter", link: "/" },
  { id: 3, name: "Instagram", link: "/" },
  { id: 4, name: "Pinterest", link: "/" },
  { id: 5, name: "Linkedin", link: "/" },
  { id: 6, name: "Youtube", link: "/" },
];

const topics = [
  { label: "Allen-f-staley", link: "/" },
  { label: "featured", link: "/" },
  { label: "John Everett millais", link: "/" },
  { label: "Pre-raphaelites", link: "/" },
];

const FORMAT_DATE = "MMM dd, yyyy hh:mm aaa";

function ArticleDetailPage() {
  const navigate = useNavigate();
  const { alias, article }: { alias: string, article: ArticleResponse} = useLoaderData() as any;

  const breadcrumbs = [
    { label: "Homepage", link: "/" },
    { label: "dadsa", link: "/" },
    { label: "24234", link: "/" },
    { label: "Sports", link: "/" },
    { label: article.title },
  ];

  useEffect(() => {
    if (!alias.includes(".html")) navigate("/404");
    animatePageIn();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-10 mt-6">
        <BreadcrumbCustom data={breadcrumbs} />
      </div>
      <div className="grid grid-cols-3 border border-foreground-gray">
        <div className="col-span-3">
          <div className="w-full h-[450px]">
            <img src={formatUrlImage(article.thumbnail!)} alt="" />
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-between">
          <div className="flex flex-col items-start gap-8 p-10 border border-foreground-gray flex-1">
            <div className="flex items-center gap-4">
              <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                sport
              </div>
              <div className="text-foreground-gray font-medium uppercase">
                {formatDateBasis(new Date(article.createdAt!), FORMAT_DATE)}
                {/* {formatDateInTimeZone(article.createdAt!, FORMAT_DATE)} */}
              </div>
            </div>
            <h2 className="text-3xl">
              {article.title}
            </h2>
            {/* <div className="w-full h-96">
              <img src={Image} alt="" />
            </div>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
              officia a iusto eaque nemo sed minima modi nam repellendus odit
              incidunt voluptates, et voluptatum repellat natus saepe fuga
              aspernatur amet?
            </div> */}
              <ContentArticle
                onChange={() => {}}
                editable={false}
                initialContent={article.content}
                className="bg-transparent"
              />
          </div>
          <div className="grid grid-cols-2 items-stretch">
            <div className="col-span-1 border border-foreground-gray px-10 py-5 flex items-center gap-6">
              <div className="h-16">
                <img src={Image} alt="" />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <div className="text-foreground-gray font-medium">Author</div>
                <div className="font-semibold capitalize">{article.user.firstName} {article.user.lastName}</div>
              </div>
            </div>
            <div className="col-span-1 border border-foreground-gray flex items-center justify-center">
              <div className="grid grid-cols-3 items-center gap-y-4 gap-x-10 font-medium">
                {socials.map((item, index) => (
                  <Link key={index} to={item.link} className="hover:underline">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-span-2 border border-foreground-gray flex items-center justify-center space-x-14 py-10">
              {topics.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="uppercase text-foreground-red text-base font-semibold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="border border-foreground-gray flex flex-col gap-10 p-10">
            <h1 className="uppercase text-2xl font-semibold">
              More retrospective
            </h1>
            {[...Array(3)].map((_i, index) => (
              <div key={index} className="flex flex-col gap-4 items-start">
                <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                  sport
                </div>
                <div className="h-96">
                  <img src={Image} alt="" />
                </div>
                <h2 className="line-clamp-3">
                  On the 'Noble Failure' of the Pre-Raphaelites, a Group Long
                  Held in 'Generally Low Repute,' in 1964
                </h2>
                <div className="w-full flex items-center justify-between">
                  <div className="text-foreground-gray font-medium">
                    By <span className="text-foreground-red">Tuan </span>
                    and <span className="text-foreground-red">PiKayQi</span>
                  </div>
                  <div className="text-foreground-gray font-medium">
                    {formatDatePublish(new Date(Date.now() - 30000))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-foreground-gray flex flex-col gap-10 p-10">
            <h1 className="uppercase text-2xl font-semibold">
              Most-read Stories
            </h1>
            {[...Array(3)].map((_i, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-4 items-start",
                  index != 0 && `border-t-2 border-foreground-gray pt-10`
                )}
              >
                <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                  sport
                </div>
                <h3 className="line-clamp-3">
                  On the 'Noble Failure' of the Pre-Raphaelites, a Group Long
                  Held in 'Generally Low Repute,' in 1964
                </h3>
                <div className="text-foreground-gray font-medium">
                  By <span className="text-foreground-red">Tuan </span>
                  and <span className="text-foreground-red">PiKayQi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 items-stretch border border-foreground-gray mt-14 mb-10">
        <div className="col-span-3 flex items-center justify-between p-10 border border-foreground-gray bg-white">
          {[...Array(4)].map((_i, index) => (
            <>
              {index !== 0 && <div className="font-semibold text-xl">/</div>}
              <h1 className="uppercase text-3xl font-medium">Football match</h1>
            </>
          ))}
        </div>
        {[...Array(3)].map((_i, index) => (
          <div
            key={index}
            className="col-span-1 min-h-[620px] h-full flex flex-col justify-between p-10 border border-foreground-gray"
          >
            <div className="flex items-center gap-4">
              <div className="uppercase py-1 text-foreground-red font-medium">
                sport
              </div>
              <div className="text-foreground-gray font-medium">
                {formatDatePublish(new Date(Date.now() - 30000))}
              </div>
            </div>
            <div className="h-96">
              <img src={Image} alt="" />
            </div>
            <h3 className="line-clamp-3">
              On the 'Noble Failure' of the Pre-Raphaelites, a Group Long Held
              in 'Generally Low Repute,' in 1964
            </h3>
            <div className="text-foreground-gray font-medium">
              By <span className="text-foreground-red">Tuan </span>
              and <span className="text-foreground-red">PiKayQi</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleDetailPage;
