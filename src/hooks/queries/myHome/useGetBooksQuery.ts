import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Books } from "@/types";

interface Props {
  value: string;
}

export const useGetBooksQuery = ({ value }: Props) => {
  const fetchBooks = async (value: string) => {
    try {
      const response = await axios.get(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: {
            query: value,
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
    queryKey: ["books", value],
    queryFn: () => fetchBooks(value),
    staleTime: Infinity,
    enabled: value.length > 0,
    select: (data) => data.documents,
  });

  return {
    books: data as Books["documents"],
  };
};
