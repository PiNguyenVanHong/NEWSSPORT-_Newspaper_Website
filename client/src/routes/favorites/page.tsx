import Image from "@/assets/news/1.jpg";
import { AuthContext } from "@/context/auth-context";
import { animatePageIn } from "@/lib/animations";

import { formatDatePublish, formatUrlImage } from "@/lib/format";
import { generateSlug } from "@/lib/utils";
import { FavoriteResponse } from "@/types/favorite.type";
import { useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

function FavoritesPage() {
  const navigate = useNavigate();

  const { token }: any = useContext(AuthContext);
  const { results } = useLoaderData() as { results: FavoriteResponse[] };

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token]);

  useEffect(() => {
    animatePageIn();
  }, []);

  const handleClick = (title: string, articleId: string) => {
    navigate(`/${generateSlug(title, articleId)}`);
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-9xl text-foreground-red font-playfair uppercase font-semibold">
        Favorites Article
      </h1>
      {results ? (
        <div className="grid grid-cols-3 items-stretch border border-foreground-gray my-10">
          <div className="col-span-3 flex items-center justify-between p-10 border border-foreground-gray bg-white">
            {[...Array(4)].map((_i, index) => (
              <>
                {index !== 0 && <div className="font-semibold text-xl">/</div>}
                <h1 className="uppercase text-3xl font-medium">
                  Favorite list
                </h1>
              </>
            ))}
          </div>
          {results.map((item, index) => (
            <div
              key={item.id}
              className="col-span-1 min-h-[700px] h-full flex flex-col justify-between p-10 border border-foreground-gray"
              onClick={() => handleClick(item.article.title, item.article.id!)}
            >
              <div className="flex items-center gap-4">
                <div className="uppercase px-4 py-1 border-2 border-foreground-red text-foreground-red font-medium">
                  sport
                </div>
                <div className="text-foreground-gray font-medium">
                  {formatDatePublish(new Date(item.article.createdAt!))}
                </div>
              </div>
              <div className="h-96">
                <img src={formatUrlImage(item.article.thumbnail!)} alt="" />
              </div>
              <h3 className="line-clamp-3">{item.article.title}</h3>
              <div className="text-foreground-gray font-normal line-clamp-3 h-16">
                {item.article.description}
              </div>
              <div className="text-foreground-gray font-medium">
                By{" "}
                <span className="text-foreground-red capitalize">
                  {item.article?.user?.firstName} {item.article?.user?.lastName}
                </span>
                {/* and <span className="text-foreground-red">PiKayQi</span> */}
              </div>
            </div>
          ))}
          {/* <div className="col-span-3 flex items-center justify-between p-10 border border-foreground-gray bg-white">
          {[...Array(4)].map((_, index) => (
            <>
              {index !== 0 && <div className="font-semibold text-xl">/</div>}
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
              On the 'Noble Failure' of the Pre-Raphaelites, a Group Long Held
              in 'Generally Low Repute,' in 1964
            </h3>
            <div className="text-foreground-gray font-normal line-clamp-3 h-16">
              No matter the eventual outcome, there was little sign that the
              negotiators would achive the kind of sweeping deal to battle back
              warming that would satisfy the demands of youth activists.
            </div>
            <div className="text-foreground-gray font-medium">
              By <span className="text-foreground-red">Tuan </span>
              and <span className="text-foreground-red">PiKayQi</span>
            </div>
          </div>
        ))} */}
          <div className="col-span-3 py-5 text-center uppercase text-xl text-foreground-red font-semibold border border-foreground-gray">
            See more
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 items-stretch border border-foreground-gray my-10">
          <div className="col-span-3 flex items-center justify-between p-10 border border-foreground-gray bg-white">
            {[...Array(4)].map((_i, index) => (
              <>
                {index !== 0 && <div className="font-semibold text-xl">/</div>}
                <h1 className="uppercase text-3xl font-medium">
                  Favorite empty
                </h1>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
