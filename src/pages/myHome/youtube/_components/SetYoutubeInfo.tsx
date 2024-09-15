import { BackButton, Header } from "@/components";
import { YoutubeItem, YoutubeItemProps } from "./YoutubeItems";
import { ReviewSection } from "../../_components";

interface Props {
  onPrevStep: () => void;
  youtubeInfo: YoutubeItemProps;
}

export const SetYoutubeInfo = ({ onPrevStep, youtubeInfo }: Props) => {
  return (
    <>
      <Header
        leftSlot={<BackButton onClick={onPrevStep} />}
        rightSlot={
          <button type="submit" className="label2">
            저장
          </button>
        }
      >
        <h1 className="head6b">새로운 리뷰</h1>
      </Header>

      <div className="flex flex-col gap-[32px] pt-[58px]">
        <YoutubeItem type="search" youtube={youtubeInfo} />

        <ReviewSection
          title="감상평"
          placeholder="영상을 본 후 어떤 생각이 드셨나요?"
          maxLength={2000}
        />
      </div>
    </>
  );
};
