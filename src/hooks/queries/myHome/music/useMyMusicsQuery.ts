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

	return { myMusicList, isFetching, MOCK_MY_MUSIC_LIST };
};

const MOCK_MY_MUSIC_LIST: MyMusic[] = [
	{
		id: 1,
		title: 'title1',
		artist: 'artist1',
		thumbnailUrl:
			'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
		review: '개똥같은 노래여서 별로에요',
	},
	{
		id: 2,
		title: 'title2',
		artist: 'artist2',
		thumbnailUrl:
			'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
	},
	{
		id: 3,
		title: 'title3',
		artist: 'artist3',
		thumbnailUrl:
			'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
	},
	{
		id: 4,
		title: 'title4',
		artist: 'artist4',
		thumbnailUrl:
			'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
	},
];
