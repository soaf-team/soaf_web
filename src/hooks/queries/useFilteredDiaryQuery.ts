import { axiosBase } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export const useFilteredDiaryQuery = ({
  isPrivate,
  date,
}: {
  isPrivate?: string;
  date: string;
}) => {
  const fetchDiary = async () => {
    const response = await axiosBase.get(`/diary/${isPrivate}/${date}`);
    return response.data;
  };

  const { data: diaries = [] as DisplayCaptureSurfaceType[] } = useQuery({
    queryKey: ["myDiary", isPrivate, date],
    queryFn: fetchDiary,
    enabled: isPrivate !== undefined,
  });

  return { diaries };
};
