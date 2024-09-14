import { useState } from "react";
import { Interior } from "@/types";
import { BooksIcon, MovieIcon, MusicIcon, YoutubeIcon } from "@/assets";

interface Props {
  interiorItems: Interior[];
}

const icons: { [key: string]: string } = {
  MusicIcon,
  YoutubeIcon,
  MovieIcon,
  BooksIcon,
};

export const BottomActionButtons = ({ interiorItems }: Props) => {
  const visibilityMap = Object.keys(icons).reduce(
    (acc, key) => {
      const item = interiorItems.find(
        (interiorItem) => interiorItem.name === key
      );
      acc[key] = item ? item.isVisible : false;
      return acc;
    },
    {} as Record<string, boolean>
  );

  const [visibility, setVisibility] = useState(visibilityMap);

  return (
    <div className="flex gap-[32px] justify-around items-center bg-white w-3/4 h-[56px] px-[32px] py-[16px] opacity-90 rounded-[28px] absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bottom-10">
      {Object.keys(icons).map((key) => (
        <div
          key={key}
          className={`flex justify-center items-center min-w-[32px] w-[32px] h-[32px] ${
            visibility[key] === true
              ? "border border-solid border-[#AEDDF9] bg-[#E2F2F6] rounded-[4px]"
              : ""
          }`}
          onClick={() =>
            setVisibility((prev) => ({ ...prev, [key]: !prev[key] }))
          }
        >
          <img src={icons[key]} alt={key} className="w-[24px] h-[24px]" />
        </div>
      ))}
    </div>
  );
};
