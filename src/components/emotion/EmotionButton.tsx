import { EMOTIONS } from "@/constants";
import { EmotionKey } from "@/types";
import { cn } from "@/utils";

type EmotionButtonProps = {
  emotion: EmotionKey;
  selected?: boolean;
  onClick?: (emotion: EmotionKey) => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick">;

export const EmotionButton = ({
  emotion,
  selected,
  onClick,
  ...props
}: EmotionButtonProps) => {
  const colorStyle = selected
    ? "bg-white text-black shadow-shadow1"
    : "bg-[#F0F1F4] text-gray300";

  const imageOpacity = selected ? "opacity-100" : "opacity-0";

  return (
    <button
      {...props}
      className={cn([
        "relative flex items-center rounded-[16px] h-[52px] p-[15px] overflow-hidden min-w-[163px] transition-all duration-100 ease-in-out",
        colorStyle,
      ])}
      onClick={() => onClick?.(emotion)}
    >
      {emotion}
      <img
        src={EMOTIONS[emotion].icon}
        alt="emotion_icon"
        className={cn(
          [
            "absolute right-[-8px] h-[60px] w-[60px] transition-opacity duration-300 ease-in-out",
          ],
          imageOpacity
        )}
      />
    </button>
  );
};
