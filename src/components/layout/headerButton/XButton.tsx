import { XIcon } from "@/assets";
import { useFlow } from "@/stackflow";

type XButtonProps = {
  onClick?: () => void;
};

export const XButton = ({ onClick }: XButtonProps) => {
  const { pop } = useFlow();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    pop();
  };

  return (
    <img
      onClick={handleClick}
      src={XIcon}
      alt="x"
      className="w-[12px] h-[12px]"
    />
  );
};
