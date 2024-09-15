import { TabButton } from "@/components";
import { useState } from "react";

interface Props {
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DiaryFilter = ({ setIsPrivate }: Props) => {
  const [isSelect, setIsSelect] = useState(true);

  const handleTabClick = (isSelect: boolean) => {
    setIsSelect(isSelect);
    setIsPrivate(isSelect);
  };

  return (
    <div className="flex w-full">
      <TabButton active={isSelect} onClick={() => handleTabClick(true)}>
        공개
      </TabButton>
      <TabButton active={!isSelect} onClick={() => handleTabClick(false)}>
        비공개
      </TabButton>
    </div>
  );
};
