import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MovieDetail } from "@/types";

export const useMovieDetailQuery = ({ id }: { id: string }) => {
  const fetchMovie = async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
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
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
    staleTime: Infinity,
    enabled: !!id,
  });

  return {
    movieInfo: data as MovieDetail,
  };
};
