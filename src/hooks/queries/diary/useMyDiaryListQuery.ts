import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { transformDiaryKey } from '@/models';
import { DiaryBackend } from '@/types';
import { useQuery } from '@tanstack/react-query';

const getMyDiaryList = async (
	year: number,
	month: number,
	isPublic?: boolean,
) => {
	const response = await axiosBase.get('diary', {
		params: {
			year,
			month,
			isPublic,
			limit: 100,
		},
	});
	return response.data?.data;
};

export const useMyDiaryListQuery = (
	year: number,
	month: number,
	isPublic?: boolean,
	userId?: string,
) => {
	const {
		data = {
			items: [],
			total: 0,
			page: 1,
			limit: 10,
		},
		isLoading,
		isError,
	} = useQuery<{
		items: DiaryBackend[];
	}>({
		queryKey: [QUERY_KEY.currentUserDiaryList, year, month, isPublic],
		queryFn: () => getMyDiaryList(year, month, isPublic),
		enabled: !!userId, // 타유저 일기 조회 시 쿼리 비활성화
	});

	const currentUserDiaryList = data.items;
	const transformedDiaryList = currentUserDiaryList.map((diary) =>
		transformDiaryKey(diary),
	);

	return { currentUserDiaryList: transformedDiaryList, isLoading, isError };
};
