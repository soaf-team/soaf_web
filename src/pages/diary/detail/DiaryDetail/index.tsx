import { useDiaryQuery } from "@/hooks";
import { DiaryContent } from "../../_components";
import { DiaryReaction } from "./DiaryReaction";

type DiaryDetailProps = {
  diaryId: string;
};

export const DiaryDetail = ({ diaryId }: DiaryDetailProps) => {
  const { diary } = useDiaryQuery({ diaryId });

  const reactions = diary!.reactions;

  return (
    <div className="flex flex-col justify-between h-full">
      {diary && <DiaryContent diary={diary} isImageClickable />}
      <DiaryReaction reactions={reactions} />
    </div>
  );
};
