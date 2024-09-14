import dayjs from "dayjs";

export const detailDate = (date: string) => {
  const now = dayjs();
  const targetDate = dayjs(date);
  const years = now.diff(targetDate, "year");
  targetDate.add(years, "years");

  if (years > 1) return `${years}년 전`;

  const months = now.diff(targetDate, "month");
  targetDate.add(months, "months");

  if (months > 1) return `${months}개월 전`;

  const weeks = now.diff(targetDate, "week");
  targetDate.add(weeks, "weeks");

  if (weeks > 1) return `${weeks}주 전`;

  const days = now.diff(targetDate, "day");
  targetDate.add(days, "days");

  if (days > 1) return `${days}일 전`;

  const hours = now.diff(targetDate, "hour");
  targetDate.add(hours, "hours");

  if (hours > 1) return `${hours}시간 전`;

  const minutes = now.diff(targetDate, "minute");
  targetDate.add(minutes, "minutes");

  if (minutes > 1) return `${minutes}분 전`;

  return `방금 전`;
};
