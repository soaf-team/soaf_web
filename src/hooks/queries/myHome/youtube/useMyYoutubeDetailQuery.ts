import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { MyYoutube } from '@/types';

interface ResMyYoutubeDetail {
	data: MyYoutube;
}

export const useMyYoutubeDetailQuery = (youtubeId: number) => {
	const fetchMyYoutubeDetail = async () => {
		const response = await axiosBase.get<ResMyYoutubeDetail>(
			`my-home/${youtubeId}`,
		);

		return response.data;
	};

	const { data: myYoutubeDetail, isFetching } = useQuery<ResMyYoutubeDetail>({
		queryKey: [QUERY_KEY.MY_YOUTUBE_DETAIL, youtubeId],
		queryFn: fetchMyYoutubeDetail,
	});

	return { myYoutubeDetail, isFetching };
};
