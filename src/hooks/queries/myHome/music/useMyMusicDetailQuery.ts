import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { MyMusic } from '@/types';

interface ResMyMusicDetail {
	data: MyMusic;
}

export const useMyMusicDetailQuery = (musicId: number) => {
	const fetchMyMusicDetail = async () => {
		const response = await axiosBase.get<ResMyMusicDetail>(
			`my-home/${musicId}`,
		);

		return response.data;
	};

	const { data: myMusicDetail, isFetching } = useQuery<ResMyMusicDetail>({
		queryKey: [QUERY_KEY.MY_MUSIC_DETAIL, musicId],
		queryFn: fetchMyMusicDetail,
	});

	return { myMusicDetail, isFetching };
};
