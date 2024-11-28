import Image from "@/assets/news/1.jpg";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDatePublish, formatUrlImage } from "@/lib/format";
import { animatePageIn } from "@/lib/animations";
import { cn, generateSlug, setDescription, setTitle } from "@/lib/utils";
import { CategoryResponse } from "@/types/category.type";
import { ArticleResponse } from "@/types/article.type";

interface CategoryNewsPageProps {
  category: CategoryResponse;
  articles: ArticleResponse[];
}

function CategoryNewsPage({ category, articles }: CategoryNewsPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
   setTitle("Category - News Sport+");
   setDescription("Category Page");
    animatePageIn();
  }, [category, articles]);

  const onClick = (title: string, id: string) => {
    navigate(`/${generateSlug(title, id)}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-9xl text-foreground-red font-playfair uppercase font-semibold mb-4">
        {category.name}
      </h1>
      {articles.length <= 0 ? (
        <div className="w-full text-center my-20 uppercase">article empty</div>
      ) : (
        <>
          <div className="grid grid-cols-3 border border-foreground-gray items-stretch">
            <div className="col-span-2 grid grid-cols-2">
              <div
                className="col-span-2 flex flex-col gap-4 p-10  border border-foreground-gray"
                onClick={() => onClick(articles[0]?.title, articles[0]?.id!)}
              >
                <div className="flex items-center gap-4">
                  <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                    sport
                  </div>
                  <div className="text-foreground-gray font-medium">
                    {formatDatePublish(new Date(articles[0]?.createdAt!))}
                  </div>
                </div>
                <div className="h-96">
                  <img src={formatUrlImage(articles[0]?.thumbnail!)} alt="" />
                </div>
                <h2 className="text-3xl">{articles[0]?.title}</h2>
                <div className="text-foreground-gray font-normal line-clamp-4 h-20">
                  {articles[0]?.description}
                </div>
                <div className="text-foreground-gray font-medium capitalize">
                  By{" "}
                  <span className="text-foreground-red">
                    {articles[0]?.user?.firstName} {articles[0]?.user?.lastName}
                  </span>
                </div>
              </div>
              {articles.slice(1, 3).map((item, index) => (
                <div
                  key={item.id ?? index}
                  className="col-span-1 flex flex-col gap-4 p-10 border border-foreground-gray"
                  onClick={() => onClick(item.title, item.id!)}
                >
                  <div className="flex items-center gap-4">
                    <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                      sport
                    </div>
                    <div className="text-foreground-gray font-medium">
                      {formatDatePublish(new Date(item.createdAt!))}
                    </div>
                  </div>
                  <div className="h-60">
                    <img src={formatUrlImage(item.thumbnail!)} alt="" />
                  </div>
                  <h3 className="line-clamp-3">{item.title}</h3>
                  <div className="text-foreground-gray font-normal line-clamp-3 h-16">
                    {item.description}
                  </div>
                  <div className="text-foreground-gray font-medium">
                    By{" "}
                    <span className="text-foreground-red capitalize">
                      {item?.user?.firstName} {item?.user?.lastName}
                    </span>
                    {/* and <span className="text-foreground-red">PiKayQi</span> */}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-1 flex flex-col items-start justify-between p-10 border border-foreground-gray">
              <h1 className="text-2xl uppercase font-semibold">
                Most-Read Stories
              </h1>
              {[...Array(6)].map((_i, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col gap-4 items-start",
                    index != 0 && "border-t-2 border-foreground-gray",
                    `pt-${6}`
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
            {[...Array(3)].map((_i, index) => (
              <div
                key={index}
                className="col-span-1 flex flex-col gap-4 p-10 border border-foreground-gray"
              >
                <div className="flex items-center gap-4">
                  <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                    sport
                  </div>
                  <div className="text-foreground-gray font-medium">
                    {formatDatePublish(new Date(Date.now() - 30000))}
                  </div>
                </div>
                <div className="h-60">
                  <img src={Image} alt="" />
                </div>
                <h3 className="line-clamp-3">
                  On the 'Noble Failure' of the Pre-Raphaelites, a Group Long
                  Held in 'Generally Low Repute,' in 1964
                </h3>
                <div className="text-foreground-gray font-normal line-clamp-3 h-16">
                  No matter the eventual outcome, there was little sign that the
                  negotiators would achive the kind of sweeping deal to battle
                  back warming that would satisfy the demands of youth
                  activists.
                </div>
                <div className="text-foreground-gray font-medium">
                  By <span className="text-foreground-red">Tuan </span>
                  and <span className="text-foreground-red">PiKayQi</span>
                </div>
              </div>
            ))}
            <div className="col-span-2 grid grid-cols-2">
              <div className="col-span-2 flex flex-col gap-4 p-10  border border-foreground-gray">
                <div className="flex items-center gap-4">
                  <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                    sport
                  </div>
                  <div className="text-foreground-gray font-medium">
                    {formatDatePublish(new Date(Date.now() - 30000))}
                  </div>
                </div>
                <div className="h-96">
                  <img src={Image} alt="" />
                </div>
                <h2 className="text-3xl">
                  On the 'Noble Failure' of the Pre-Raphaelites, a Group Long
                  Held in 'Generally Low Repute,' in 1964
                </h2>
                <div className="text-foreground-gray font-normal line-clamp-4 h-20">
                  No matter the eventual outcome, there was little sign that the
                  negotiators would achive the kind of sweeping deal to battle
                  back warming that would satisfy the demands of youth
                  activists.
                </div>
                <div className="text-foreground-gray font-medium">
                  By <span className="text-foreground-red">Tuan </span>
                  and <span className="text-foreground-red">PiKayQi</span>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-between p-10 border border-foreground-gray">
              <div className="flex items-center gap-4">
                <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
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
              <div className="text-foreground-gray font-normal line-clamp-3 h-16">
                No matter the eventual outcome, there was little sign that the
                negotiators would achive the kind of sweeping deal to battle
                back warming that would satisfy the demands of youth activists.
              </div>
              <div className="text-foreground-gray font-medium">
                By <span className="text-foreground-red">Tuan </span>
                and <span className="text-foreground-red">PiKayQi</span>
              </div>
            </div>
            <div className="col-span-3 py-5 text-center uppercase text-xl text-foreground-red font-semibold border border-foreground-gray">
              See more
            </div>
          </div>
          <div className="grid grid-cols-3 items-stretch border border-foreground-gray my-20">
            <div className="col-span-3 flex items-center justify-between p-10 border border-foreground-gray bg-white">
              {[...Array(4)].map((_i, index) => (
                <>
                  {index !== 0 && (
                    <div className="font-semibold text-xl">/</div>
                  )}
                  <h1 className="uppercase text-3xl font-medium">
                    Football match
                  </h1>
                </>
              ))}
            </div>
            {[...Array(3)].map((_i, index) => (
              <div
                key={index}
                className="col-span-1 min-h-[700px] h-full flex flex-col justify-between p-10 border border-foreground-gray"
              >
                <div className="flex items-center gap-4">
                  <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
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
                  On the 'Noble Failure' of the Pre-Raphaelites, a Group Long
                  Held in 'Generally Low Repute,' in 1964
                </h3>
                <div className="text-foreground-gray font-normal line-clamp-3 h-16">
                  No matter the eventual outcome, there was little sign that the
                  negotiators would achive the kind of sweeping deal to battle
                  back warming that would satisfy the demands of youth
                  activists.
                </div>
                <div className="text-foreground-gray font-medium">
                  By <span className="text-foreground-red">Tuan </span>
                  and <span className="text-foreground-red">PiKayQi</span>
                </div>
              </div>
            ))}
            <div className="col-span-3 flex items-center justify-between p-10 border border-foreground-gray bg-white">
              {[...Array(4)].map((_, index) => (
                <>
                  {index !== 0 && (
                    <div className="font-semibold text-xl">/</div>
                  )}
                  <h1 className="uppercase text-3xl font-medium">
                    Serie A & La liga
                  </h1>
                </>
              ))}
            </div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="col-span-1 min-h-[700px] h-full flex flex-col justify-between p-10 border border-foreground-gray"
              >
                <div className="flex items-center gap-4">
                  <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
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
                  On the 'Noble Failure' of the Pre-Raphaelites, a Group Long
                  Held in 'Generally Low Repute,' in 1964
                </h3>
                <div className="text-foreground-gray font-normal line-clamp-3 h-16">
                  No matter the eventual outcome, there was little sign that the
                  negotiators would achive the kind of sweeping deal to battle
                  back warming that would satisfy the demands of youth
                  activists.
                </div>
                <div className="text-foreground-gray font-medium">
                  By <span className="text-foreground-red">Tuan </span>
                  and <span className="text-foreground-red">PiKayQi</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryNewsPage;
