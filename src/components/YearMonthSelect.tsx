import { useEffect, useRef, useState } from "react";

import {
  DrawerTrigger,
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/dialog";

import { Check } from "@/components/ui";
import { Triangle } from "@/assets";

const YEAR_MONTH_LIST_LENGTH = 36;
const ITEM_HEIGHT = 44;
const HALF_VISIBLE_ITEMS = 3;

type YearMonthSelectProps = {
  currentDate: Date;
  handleCurrentDate: (newDate: Date) => void;
};

export const YearMonthSelect = ({
  currentDate,
  handleCurrentDate,
}: YearMonthSelectProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const yearMonthArray = Array.from(
    { length: YEAR_MONTH_LIST_LENGTH },
    (_, i) => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth() - i);
    }
  );
  const selectedIndex = yearMonthArray.findIndex(
    (date) => getYearMonthString(date) === getYearMonthString(currentDate)
  );
  const currentYearMonth = getYearMonthString(currentDate);

  function getYearMonthString(date: Date) {
    return date.toLocaleString("default", {
      year: "numeric",
      month: "long",
    });
  }

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const newScrollPosition =
        ITEM_HEIGHT * (selectedIndex - HALF_VISIBLE_ITEMS) || 0;

      scrollContainer.scrollTo({
        top: newScrollPosition,
      });
    }
  }, [isDrawerOpen]);

  return (
    <Drawer onClose={() => setIsDrawerOpen(false)}>
      <DrawerTrigger
        onClick={() => {
          setTimeout(() => setIsDrawerOpen(true), 100);
        }}
      >
        <div className="flex items-center gap-[4px]">
          <h2 className="label1sb">
            {currentDate.getFullYear()}.
            {currentDate.getMonth() + 1 < 10
              ? `0${currentDate.getMonth() + 1}`
              : `${currentDate.getMonth() + 1}`}
          </h2>
          <img src={Triangle} alt="triangle" className="w-[8px] h-[5px]" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col items-center gap-[16px] pb-[12px]">
          <h2 className="label1">월 선택하기</h2>
          <div
            className="flex flex-col gap-[16px] overflow-auto h-[330px] w-full items-center"
            ref={scrollContainerRef}
          >
            {yearMonthArray.map((yearMonth, i) => {
              const thisYearMonth = getYearMonthString(yearMonth);
              const isSelected = currentYearMonth === thisYearMonth;
              const textClass = isSelected
                ? "text-primary font-bold text-[18px] leading-[28px]"
                : "body1";

              return (
                <DrawerClose key={i}>
                  <div
                    onClick={() => {
                      handleCurrentDate(yearMonth);
                    }}
                    className="flex items-center justify-between gap-[8px] relative"
                  >
                    <span className={textClass}>
                      {yearMonth.toLocaleString("default", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                    {isSelected && (
                      <div className="absolute right-[-30px]">
                        <Check isChecked />
                      </div>
                    )}
                  </div>
                </DrawerClose>
              );
            })}
            <div className="absolute bottom-[38px] h-[50px] w-full bg-gradient-to-b from-transparent to-white" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
