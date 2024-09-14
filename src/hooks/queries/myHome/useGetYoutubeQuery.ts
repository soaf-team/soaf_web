import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Youtube } from "@/types";

interface Props {
  videoId: string;
}

export const useGetYoutubeQuery = ({ videoId }: Props) => {
  const fetchVideo = async (videoId: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          params: {
            part: "snippet",
            id: videoId,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["youtube", videoId],
    queryFn: () => fetchVideo(videoId),
    staleTime: Infinity,
    enabled: !!videoId,
    select: (data) => data.items[0],
  });

  return {
    youtube: data as Youtube["items"][0],
  };
};
