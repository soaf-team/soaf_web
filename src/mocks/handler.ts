import { HttpResponse, http } from "msw";
import diary from "./diary.json";
import matchedUser from "./matchedUser.json";
import interior from "./interior.json";

export const handlers = [
  // 일기 조회
  http.get("/diary", async () => {
    return HttpResponse.json(diary, { status: 200 });
  }),

  // 일기 작성
  http.post("/diary", async () => {
    diary.push({
      id: "4",
      date: "2024.04.12",
      title: "title4",
      photos: ["photo1", "photo2"],
      content: "content4",
      emotions: ["tired"],
      reactions: ["reaction1", "reaction2"],
      isPrivate: false,
    });

    return HttpResponse.json(diary);
  }),

  // 월 별 일기 데이터 조회
  http.get("/diary/:date", async req => {
    const { date } = req.params;

    const diaryByDate = diary.filter(diary =>
      diary.date.includes(date as string),
    );

    if (!diaryByDate) {
      return HttpResponse.json(
        { message: "아직 작성된 일기가 없어요." },
        { status: 404 },
      );
    }

    return HttpResponse.json(diaryByDate, { status: 200 });
  }),

  // 소프 탐색
  http.get("/soaf-explore", async () => {
    return HttpResponse.json(matchedUser, { status: 200 });
  }),

  // 인테리어 아이템 조회
  http.get("/interior-items", async () => {
    return HttpResponse.json(interior, { status: 200 });
  }),

  // isPrivate와 date 에 따른 일기 조회
  http.get("/diary/:isPrivate/:date", async req => {
    const { isPrivate, date } = req.params;

    const filteredDiary = diary.filter(
      diary =>
        diary.isPrivate.toString() === isPrivate &&
        diary.date.includes(date as string),
    );

    if (!filteredDiary) {
      return HttpResponse.json(
        { message: "해당하는 일기가 없어요." },
        { status: 404 },
      );
    }

    return HttpResponse.json(filteredDiary, { status: 200 });
  }),
];
