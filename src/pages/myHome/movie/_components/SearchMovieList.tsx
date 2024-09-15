import { useGetMoviesQuery } from "@/hooks";
import { useState } from "react";
import { SearchInput } from "../../_components/SearchInput";
import { Movie } from "@/types";
import { MovieItem } from "./MovieItem";

interface Props {
  onNextStep: () => void;
  setMovieId: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchMovieList = ({ onNextStep, setMovieId }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { movies } = useGetMoviesQuery({ value: searchQuery });

  const handleItemClick = (movie: Movie) => {
    setMovieId(movie.id.toString());
    onNextStep();
  };

  if (!movies) return null;

  return (
    <>
      <SearchInput type="movie" setSearchQuery={setSearchQuery} />

      {movies.map((movie: Movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onClick={() => handleItemClick(movie)}
        />
      ))}
    </>
  );
};
