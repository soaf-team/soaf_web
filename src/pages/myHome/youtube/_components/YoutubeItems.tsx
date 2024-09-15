import { Thumbnail, Youtube } from "@/types";
import { cn, detailDate } from "@/utils";

export interface YoutubeItemProps
  extends Pick<
    Youtube["items"][0]["snippet"],
    "title" | "channelTitle" | "publishedAt"
  > {
  thumbnail: Thumbnail["url"];
}

interface Props {
  type?: "search" | "list" | "detail";
  onClick?: () => void;
  youtube: YoutubeItemProps;
}

export const YoutubeItem = ({ type = "search", onClick, youtube }: Props) => {
  const posterClass = cn({
    "min-w-[154px] w-[154px] h-[86px] rounded-[8px]":
      type === "search" || "list",
    "w-full h-[197px] rounded-[8px]": type === "detail",
  });

  const titleClass = cn(
    {
      label2: type === "search" || "list",
      head5b: type === "detail",
    },
    "text-black"
  );

  if (!youtube) return null;

  return (
    <div className="flex flex-col gap-[16px]border-b border-solid border-border py-[8px]">
      <div className="flex gap-[16px]" onClick={onClick}>
        <div className={posterClass}>
          <img src={youtube.thumbnail} alt="cover" className={posterClass} />
        </div>

        <div className="flex flex-col justify-between gap-[8px] py-[8px]">
          <p className={cn("line-clamp-2", titleClass)}>{youtube.title}</p>
          <div className="flex gap-[4px] justify-center label4 text-gray200">
            <p>{detailDate(youtube.publishedAt)}</p>

            <p>{youtube.channelTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
