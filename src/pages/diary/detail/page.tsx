import {
  AsyncBoundary,
  BackButton,
  DotVerticalButton,
  PageLayout,
} from "@/components";
import { ActivityComponentType } from "@stackflow/react";
import { DiaryDetail } from "./DiaryDetail";

type DiaryDetailPageParams = {
  diaryId: string;
};

const DiaryDetailPage: ActivityComponentType<DiaryDetailPageParams> = ({
  params,
}) => {
  const diaryId = params.diaryId;

  return (
    <PageLayout
      header={{
        leftSlot: <BackButton />,
        rightSlot: <DotVerticalButton />,
      }}
    >
      <AsyncBoundary>
        <DiaryDetail diaryId={diaryId} />
      </AsyncBoundary>
    </PageLayout>
  );
};

export default DiaryDetailPage;

DiaryDetailPage.displayName = "DiaryDetailPage";
