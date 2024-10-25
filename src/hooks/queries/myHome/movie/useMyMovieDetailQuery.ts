import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { MyMovie } from '@/types';

interface ResMyMovieDetail {
	data: MyMovie;
}

export const useMyMovieDetailQuery = (movieId: number) => {
	const fetchMyMovieDetail = async () => {
		const response = await axiosBase.get<ResMyMovieDetail>(
			`my-home/${movieId}`,
		);

		return response.data;
	};

	const { data: myMovieDetail, isFetching } = useQuery<ResMyMovieDetail>({
		queryKey: [QUERY_KEY.MY_MOVIE_DETAIL, movieId],
		queryFn: fetchMyMovieDetail,
	});

	return { myMovieDetail, isFetching };
};
