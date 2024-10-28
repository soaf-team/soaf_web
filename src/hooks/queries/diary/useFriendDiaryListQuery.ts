import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { transformDiaryKey } from '@/models';
import { DiaryBackend, DiaryType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface DiaryListResponse {
	data: {
		items: DiaryBackend[];
		total: number;
		page: number;
		limit: number;
	};
}

interface DefaultDiaryList {
	items: DiaryType[];
	total: number;
	page: number;
	limit: number;
}

const getFriendDiaryList = async (
	friendId: string,
	year: number,
	month: number,
): Promise<DiaryListResponse['data']> => {
	const response: AxiosResponse<DiaryListResponse> = await axiosBase.get(
		`diary/friend/${friendId}`,
		{
			params: {
				year,
				month,
				limit: 100,
			},
		},
	);
	return response.data.data;
};

const DEFAULT_DIARY_LIST: DefaultDiaryList = {
	items: [],
	total: 0,
	page: 1,
	limit: 10,
} as const;

export const useFriendDiaryListQuery = (
	friendId: string,
	year: number,
	month: number,
) => {
	if (!friendId) return { data: null };

	const {
		data = DEFAULT_DIARY_LIST,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [QUERY_KEY.FRIEND_DIARY_LIST, friendId, year, month] as const,
		queryFn: () => getFriendDiaryList(friendId, year, month),
		select: (data): DefaultDiaryList => {
			const friendDiaryList = data.items;
			const transformedDiaryList = friendDiaryList.map((diary: DiaryBackend) =>
				transformDiaryKey(diary),
			);

			return {
				items: transformedDiaryList,
				total: data.total,
				page: data.page,
				limit: data.limit,
			};
		},
	});

	return {
		data,
		isLoading,
		isError,
	} as const;
};

export type FriendDiaryListQueryResult = ReturnType<
	typeof useFriendDiaryListQuery
>;
