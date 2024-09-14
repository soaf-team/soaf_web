import { MoodRating } from "@/types";
import { MoodFlow } from "./MoodFlow";
import { MoodDistribution } from "./MoodDistribution";
import { EmotionsOfTheMonth } from "./EmotionsOfTheMonth";

type DiaryStatsProps = {
  currentDate: Date;
};

export const DiaryStats = ({ currentDate }: DiaryStatsProps) => {
  console.log(currentDate);

  return (
    <>
      <MoodFlow data={MOOD_FLOW_DATA} />
      <MoodDistribution data={MOOD_DISTRIBUTION_DATA} />
      <EmotionsOfTheMonth data={EMOTIONS_OF_THE_MONTH_DATA} />
    </>
  );
};

const MOOD_DISTRIBUTION_DATA = {
  "1": 18,
  "2": 29,
  "3": 6,
  "4": 29,
  "5": 18,
};

const EMOTIONS_OF_THE_MONTH_DATA = {
  슬픈: 4,
  설레는: 3,
  화난: 2,
};

const MOOD_FLOW_DATA: {
  date: string;
  rating: MoodRating;
}[] = [
  { date: "2024-06-01", rating: 1 },
  { date: "2021-06-02", rating: 3 },
  { date: "2021-06-03", rating: 5 },
  { date: "2021-06-04", rating: 4 },
  { date: "2021-06-05", rating: 3 },
  { date: "2021-06-06", rating: 1 },
  { date: "2021-06-07", rating: 3 },
  { date: "2021-06-08", rating: 2 },
  { date: "2021-06-09", rating: 3 },
  { date: "2021-06-10", rating: 5 },
  { date: "2021-06-11", rating: 3 },
  { date: "2021-06-12", rating: 3 },
  { date: "2021-06-13", rating: 4 },
  { date: "2021-06-14", rating: 3 },
  { date: "2021-06-15", rating: 2 },
  { date: "2021-06-16", rating: 3 },
  { date: "2021-06-17", rating: 4 },
  { date: "2021-06-18", rating: 3 },
  { date: "2021-06-19", rating: 5 },
  { date: "2021-06-20", rating: 3 },
  { date: "2021-06-21", rating: 1 },
  { date: "2021-06-22", rating: 1 },
  { date: "2021-06-23", rating: 3 },
  { date: "2021-06-24", rating: 3 },
  { date: "2021-06-25", rating: 2 },
  { date: "2021-06-26", rating: 3 },
  { date: "2021-06-27", rating: 3 },
  { date: "2021-06-28", rating: 5 },
  { date: "2021-06-29", rating: 3 },
  { date: "2021-06-30", rating: 4 },
];
