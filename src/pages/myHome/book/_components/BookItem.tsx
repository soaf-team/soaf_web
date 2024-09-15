import default_cover from "@/assets/icons/my-home/books-default.svg";
import { StarRating } from "@/components";
import { Document } from "@/types";
import { cn } from "@/utils";

interface Props {
  type?: "search" | "set" | "detail";
  onClick?: () => void;
  book: Document;
}

export const BookItem = ({ type = "search", onClick, book }: Props) => {
  const posterClass = cn({
    "min-w-[92px] w-[92px] h-[134px] rounded-[8px]": type === "search",
    "min-w-[85px] w-[85px] h-[124px] rounded-[8px] ": type === "set",
    "min-w-[96px] w-[96px] h-[140px] rounded-[8px]": type === "detail",
  });

  const titleClass = cn(
    {
      label2: type === "search",
      head5b: type === "set" || "detail",
    },
    "text-black"
  );

  return (
    <div className="flex flex-col gap-[16px] border-b border-solid border-border py-[8px]">
      <div className="flex gap-[16px]" onClick={onClick}>
        <div className={posterClass}>
          <img
            src={book.thumbnail || default_cover}
            alt="cover"
            className={posterClass}
          />
        </div>

        <div
          className={cn(
            "flex flex-col gap-[8px] py-[8px]",
            type === "search" ? "justify-between" : ""
          )}
        >
          <div className="flex flex-col gap-[8px]">
            <p className={cn("line-clamp-1", titleClass)}>{book.title}</p>
            <div className="flex flex-col gap-[4px]">
              <p className="label3 text-gray400">{book.authors[0]}</p>
              <div className="flex gap-[4px]">
                <p className="text-gray400 label4">{book.publisher}</p>

                <p className="label4 text-gray400">
                  {`(${book.datetime.split("T")[0]})`}
                </p>
              </div>
            </div>
          </div>
          {type === "search" && (
            <p className="line-clamp-3 body4">{book.contents}</p>
          )}
          {type === "detail" && <StarRating size={24} onChange={() => {}} />}
        </div>
      </div>
    </div>
  );
};
