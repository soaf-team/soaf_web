import { DiaryIcon, MainDayIcon, MainNightIcon } from "@/assets";
import { useFlow } from "@/stackflow";
import { cn } from "@/utils";

interface Props {
  className?: string;
  isAfter6PM: boolean;
}

export const DeskAndChair = (props: Props) => {
  const { push } = useFlow();

  const { className, isAfter6PM } = props;

  return (
    <div className={cn("relative", className)}>
      <img
        src={isAfter6PM ? MainNightIcon : MainDayIcon}
        alt="desk-and-chair"
        className="full_img_cover"
      />

      <img
        src={DiaryIcon}
        alt="diary"
        className="absolute_center ml-[13px] mt-[3px] w-1/4"
        onClick={() => push("MyDiaryPage", {})}
      />
    </div>
  );
};