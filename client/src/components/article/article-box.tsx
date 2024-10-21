import { formatDatePublish } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ArticleBoxProps {
  category?: string;
  title: string;
  author1?: string;
  author2?: string;
  publishedAt?: Date;
  description?: string;
  thumbnail?: string;
  className?: string;
}

const ArticleBox = ({
  category,
  title,
  author1,
  author2,
  publishedAt,
  description,
  thumbnail,
  className,
}: ArticleBoxProps) => {
  return (
    <div className={cn("w-full grid grid-cols-3 gap-4 ", className)}>
      {thumbnail && (
        <div>
          <img src={thumbnail} alt="" />
        </div>
      )}
      <div
        className={cn(
          "flex flex-col gap-3 items-center",
          thumbnail ? "col-span-2" : "col-span-3"
        )}
      >
        <h2 className="font-second text-xl">{title}</h2>
        <div className="line-clamp-5 lg:line-clamp-3">{description}</div>
        {publishedAt && (
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:justify-between">
            <div>
              By <span className="text-foreground-red">{author1}</span>
              {author2 && (
                <span>
                  and <span className="text-foreground-red">{author2}</span>
                </span>
              )}
            </div>
            <div>{formatDatePublish(publishedAt)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleBox;
