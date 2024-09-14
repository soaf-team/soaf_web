import { BellIcon, BrushIcon, SettingIcon } from "@/assets";

interface Props {
  onBrushClick?: () => void;
}

export const HeaderActionButtons = ({ onBrushClick }: Props) => {
  return (
    <div className="flex gap-[14px]">
      <button className="w-[24px] h-[24px]" onClick={onBrushClick}>
        <img src={BrushIcon} alt="brush-icon" className="full_img_cover" />
      </button>
      <button className="w-[24px] h-[24px]">
        <img src={BellIcon} alt="brush-icon" className="full_img_cover" />
      </button>
      <button className="w-[24px] h-[24px]">
        <img src={SettingIcon} alt="brush-icon" className="full_img_cover" />
      </button>
    </div>
  );
};
