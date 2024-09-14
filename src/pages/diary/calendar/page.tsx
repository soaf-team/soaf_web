import { ActivityComponentType } from "@stackflow/react";
import { useFlow } from "@/stackflow";

import { ListIcon } from "@/assets";
import { PageLayout } from "@/components/layout";
import { MyDiaryCalendar } from "./MyDiaryCalendar";

const DiaryCalendarPage: ActivityComponentType = () => {
  const { push } = useFlow();

  const handleClickListButton = () => {
    push("DiaryListPage", {});
  };

  return (
    <PageLayout
      header={{
        rightSlot: (
          <img src={ListIcon} alt="list" onClick={handleClickListButton} />
        ),
      }}
    >
      <MyDiaryCalendar />
    </PageLayout>
  );
};

export default DiaryCalendarPage;

DiaryCalendarPage.displayName = "DiaryCalendar";
