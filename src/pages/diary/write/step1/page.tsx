import { ActivityComponentType } from "@stackflow/react";
import { useEffect } from "react";

import { useFlow } from "@/stackflow";
import { useDiaryStore } from "@/store";
import { MoodRating } from "@/types";
import {
  Dialog,
  DialogTrigger,
  PageLayout,
  Spacing,
  XButton,
} from "@/components";
import { DailyRatingWidget } from "./DailyRatingWidget";
import { Step } from "../_components/Step";
import { DiaryCancelConfirmDialog } from "../_components/DiaryCancelConfirmDialog";

const NICK_NAME = "뽀송하루";
const MAIN_MESSAGE = `${NICK_NAME}님,\n오늘 하루는 어떠셨나요?`;

const NewDiaryStep1: ActivityComponentType = () => {
  const { diary, onChangeRating, resetAllDiaryState, onChangeDate } =
    useDiaryStore();
  const { push, pop } = useFlow();

  const canBackWithoutDialog = diary.rating == null;

  const handleXButtonClick = () => {
    pop(1);
    resetAllDiaryState();
  };

  const handleSelectRating = (rating: MoodRating) => {
    onChangeRating(rating);
    push("NewDiaryStep2", {});
  };

  useEffect(() => {
    onChangeDate(new Date());
  }, []);

  const headerRightButton = canBackWithoutDialog ? (
    <XButton onClick={handleXButtonClick} />
  ) : (
    <DialogTrigger>
      <XButton onClick={() => {}} />
    </DialogTrigger>
  );

  return (
    <Dialog>
      <PageLayout
        header={{ rightSlot: headerRightButton }}
        className="items-center"
      >
        <Step currentStep={1} totalStep={2} mainMessage={MAIN_MESSAGE} />
        <Spacing size={24} />
        <DailyRatingWidget
          selectedRating={diary.rating}
          handleSelectRating={handleSelectRating}
        />
      </PageLayout>
      <DiaryCancelConfirmDialog popCount={1} />
    </Dialog>
  );
};

export default NewDiaryStep1;

NewDiaryStep1.displayName = "NewDiaryStep1";
