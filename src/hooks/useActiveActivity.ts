import { Stack } from "@stackflow/core";

export const useActiveActivity = (stack: Stack) => {
  const activeActivity = stack.activities.find(
    (activity) => activity.isActive
  )!;
  const isBottomTabActivity = [
    "DiaryCalendarPage",
    "DiaryStatsPage",
    "SoafExplorePage",
    "Chat",
    "MyHome",
  ].includes(activeActivity.name);

  return { activeActivity, isBottomTabActivity };
};
