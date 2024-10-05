import { useQuery } from '@tanstack/react-query';
import { axiosBase } from '@/apis';
import { MyMusic } from '@/types';
import { QUERY_KEY } from '@/constants';

// TODO: infinite query

interface ResMyMusicList {
	data: MyMusic[];
}

export const useMyMusicListQuery = (userId: string) => {
	const fetchMyMusicList = async () => {
		const response = await axiosBase.get<ResMyMusicList>('my-home', {
			params: {
				userId,
			},
		});

		return response.data;
	};

	const { data: myMusicList, isFetching } = useQuery<ResMyMusicList>({
		queryKey: [QUERY_KEY.MY_MUSIC_LIST, userId],
		queryFn: fetchMyMusicList,
	});

	return { myMusicList, isFetching };
};
