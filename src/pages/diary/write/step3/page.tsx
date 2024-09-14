import { useEffect } from "react";
import { ActivityComponentType } from "@stackflow/react";

import { useFlow } from "@/stackflow";
import { useDiaryStore } from "@/store";
import {
  BackButton,
  Dialog,
  DialogTrigger,
  PageLayout,
  XButton,
} from "@/components";
import { DiaryForm } from "../_components/DiaryForm";
import { DiaryCancelConfirmDialog } from "../_components/DiaryCancelConfirmDialog";

const NewDiaryStep3: ActivityComponentType = () => {
  const { replace } = useFlow();
  const {
    diary,
    onChangeEmotionOrder,
    onChangeTitle,
    onChangeContent,
    onChangePhotos,
    togglePrivate,
    resetAllDiaryState,
  } = useDiaryStore();
  const isUnusualApproach =
    diary.emotions.length === 0 || diary.rating === null || !diary.date;

  useEffect(() => {
    if (isUnusualApproach) {
      replace("DiaryCalendar", {});
      resetAllDiaryState();
    }
  }, []);

  if (isUnusualApproach) {
    return null;
  }

  return (
    <Dialog>
      <PageLayout
        header={{
          leftSlot: <BackButton />,
          rightSlot: (
            <DialogTrigger>
              <XButton onClick={() => {}} />
            </DialogTrigger>
          ),
        }}
      >
        <DiaryForm
          diary={diary}
          handleReorderEmotions={onChangeEmotionOrder}
          handleTitleChange={onChangeTitle}
          handleContentChange={onChangeContent}
          handlePhotosChange={onChangePhotos}
          handleTogglePrivate={togglePrivate}
        />
        <DiaryCancelConfirmDialog popCount={3} />
      </PageLayout>
    </Dialog>
  );
};

export default NewDiaryStep3;

NewDiaryStep3.displayName = "NewDiaryStep3";
