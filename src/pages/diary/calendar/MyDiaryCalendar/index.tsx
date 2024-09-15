import { useState } from "react";
import { useFlow } from "@/stackflow";

import { cn, getDateStatus } from "@/utils";
import { Diary } from "@/types";
import { useDiaryListQuery } from "@/hooks";
import { Plus } from "@/assets";

import { Drawer, DrawerTrigger, EmotionSticker } from "@/components";
import { Calendar } from "../../_components";
import { DiaryContentDrawer } from "./DiaryContentDrawer";
import { YearMonthSelect } from "@/components/YearMonthSelect";

export const MyDiaryCalendar = () => {
  const { push } = useFlow();
  const { myDiaries } = useDiaryListQuery();
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    string | number | null
  >(0.5);

  const handleDateClick = (diaryAtDate: Diary, isFuture: boolean) => {
    setActiveSnapPoint(0.5);
    if (diaryAtDate) {
      setSelectedDiary(diaryAtDate);
    }
    if (isFuture || diaryAtDate) return;
    push("NewDiaryStep1", {});
  };

  const resetSelectedDiary = () => {
    setTimeout(() => {
      setSelectedDiary(null);
    }, 300);
  };

  return (
    <Drawer
      snapPoints={[0.25, 0.5, 0.92]}
      closeThreshold={0.6}
      fadeFromIndex={3}
      onClose={resetSelectedDiary}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
    >
      <div className="flex flex-col items-center h-full">
        <YearMonthSelect
          currentDate={currentDate}
          handleCurrentDate={setCurrentDate}
        />
        <Calendar
          currentDate={currentDate}
          render={(day, index, isToday) => {
            const isFuture = day && getDateStatus(day, new Date()) === "future";
            const diaryAtDate = myDiaries.find(
              (diary: Diary) =>
                day && getDateStatus(new Date(diary.date), day) === "today"
            );
            const diaryMainEmotion = diaryAtDate?.emotions[0];
            const dayTextClass = isToday
              ? "text-white bg-gray600 rounded-full"
              : "text-gray200";
            const dayCircleClass = isFuture
              ? "cursor-default bg-[#F0F1F466]"
              : "cursor-pointer transition-all duration-200 ease-in-out bg-gray50";

            if (day == null) return <div key={index} />;

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-end gap-[5px]"
              >
                <span
                  className={cn([
                    "body4 w-[30px] h-[17px] text-gray300 text-center",
                    dayTextClass,
                  ])}
                >
                  {day?.getDate()}
                </span>
                <div
                  key={index}
                  onClick={() => handleDateClick(diaryAtDate, isFuture)}
                  className={cn([
                    "flex items-center justify-center relative h-[40px] w-[40px] rounded-full",
                    dayCircleClass,
                  ])}
                >
                  <DrawerTrigger disabled={!diaryAtDate}>
                    {diaryMainEmotion && (
                      <EmotionSticker emotion={diaryAtDate?.emotions[0]} />
                    )}
                    {isToday && !diaryMainEmotion && (
                      <img
                        src={Plus}
                        alt="add_icon"
                        className="absolute_center w-[12px] h-[12px] pointer-events-none"
                      />
                    )}
                  </DrawerTrigger>
                </div>
              </div>
            );
          }}
        />
      </div>

      {selectedDiary && <DiaryContentDrawer diary={selectedDiary} />}
    </Drawer>
  );
};
