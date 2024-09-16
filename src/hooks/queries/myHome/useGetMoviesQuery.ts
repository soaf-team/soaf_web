import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MovieList } from '@/types';

export const useGetMoviesQuery = ({ value }: { value: string }) => {
	const fetchMovies = async (value: string) => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?&query=${value}&include_adult=false&language=ko-KR&page=1`,
				{
					params: {
						append_to_response: 'credits',
					},
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
						Accept: 'application/json',
					},
				},
			);

			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const { data: movies = [] as MovieList[] } = useQuery({
		queryKey: ['movies', value],
		queryFn: () => fetchMovies(value),
		staleTime: Infinity,
		enabled: value.length > 0,
		select: (data) => data.results,
	});

	return {
		movies,
	};
};
