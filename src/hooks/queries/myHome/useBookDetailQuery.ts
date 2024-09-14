import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Books } from "@/types";

export const useBookDetailQuery = ({ id }: { id: string }) => {
  const fetchBook = async () => {
    try {
      const response = await axios.get(
        "https://dapi.kakao.com/v3/search/book?target=isbn",
        {
          params: {
            query: id,
          },
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
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
    queryKey: ["book", id],
    queryFn: fetchBook,
    staleTime: Infinity,
    select: (data) => data.documents[0],
  });

  return {
    bookInfo: data as Books["documents"][0],
  };
};
