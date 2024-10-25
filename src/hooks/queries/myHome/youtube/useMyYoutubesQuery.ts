import { useQuery } from '@tanstack/react-query';
import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { MyYoutube } from '@/types';
// TODO: infinite query

interface ResMyYoutubeList {
	data: MyYoutube[];
}

export const useMyYoutubesQuery = (userId: string) => {
	const fetchMyYoutubeList = async () => {
		const response = await axiosBase.get<ResMyYoutubeList>('my-home', {
			params: {
				userId,
				category: 'youtube',
			},
		});

		return response.data;
	};

	const { data: myYoutubeList, isFetching } = useQuery<ResMyYoutubeList>({
		queryKey: [QUERY_KEY.MY_YOUTUBE_LIST, userId],
		queryFn: fetchMyYoutubeList,
	});

	return { myYoutubeList, isFetching };
};
