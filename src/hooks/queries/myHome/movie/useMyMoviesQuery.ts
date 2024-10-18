import { useQuery } from '@tanstack/react-query';
import { axiosBase } from '@/apis';
import { MyMovie } from '@/types';
import { QUERY_KEY } from '@/constants';

// TODO: infinite query

interface ResMyMovieList {
	data: MyMovie[];
}

export const useMyMoviesQuery = (userId: string) => {
	const fetchMyMovieList = async () => {
		const response = await axiosBase.get<ResMyMovieList>('my-home', {
			params: {
				userId,
				category: 'movie',
			},
		});

		return response.data;
	};

	const { data: myMovieList, isFetching } = useQuery<ResMyMovieList>({
		queryKey: [QUERY_KEY.MY_MOVIE_LIST, userId],
		queryFn: fetchMyMovieList,
	});

	return { myMovieList, isFetching };
};
