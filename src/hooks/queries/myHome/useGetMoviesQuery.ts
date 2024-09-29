import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieList } from '@/types';

export const useGetMoviesQuery = ({ value }: { value: string }) => {
	const fetchMovies = async ({
		value,
		pageParam,
	}: {
		value: string;
		pageParam: number;
	}) => {
		try {
			const response = await axios.get(
				'https://api.themoviedb.org/3/search/movie',
				{
					params: {
						append_to_response: 'credits',
						query: value,
						page: pageParam,
						include_adult: false,
						language: 'ko-KR',
					},
				},
			);

			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const { data, hasNextPage, fetchNextPage, isFetching } =
		useInfiniteQuery<MovieList>({
			queryKey: ['movies', value],
			queryFn: ({ pageParam = 1 }) =>
				fetchMovies({ value, pageParam: pageParam as number }),
			initialPageParam: 1,
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.total_pages < lastPage.page) {
					return undefined;
				}

				return allPages.length + 1;
			},
			staleTime: Infinity,
			enabled: !!value,
		});

	const handleFetchNextPage = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	return {
		movies: data?.pages.flatMap((page) => page.results),
		handleFetchNextPage,
		isFetching,
	};
};
