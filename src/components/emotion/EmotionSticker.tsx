import { EMOTIONS } from "@/constants";
import { EmotionKey } from "@/types";
import { cn } from "@/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  emotion: EmotionKey;
  size?: string;
}

export const EmotionSticker = ({
  emotion,
  size = "lg",
  className,
  ...props
}: Props) => {
  const stickerSize = {
    sm: "w-[16px] h-[16px]",
    md: "w-[32px] h-[32px]",
    lg: "w-[42px] h-[42px]",
  }[size];

  return (
    <div className={cn(stickerSize, className)} {...props}>
      <img
        src={EMOTIONS[emotion].icon}
        alt="emotion_icon"
        className="object-cover w-full h-full"
      />
    </div>
  );
};
