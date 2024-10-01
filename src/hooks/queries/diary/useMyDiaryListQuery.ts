import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { transformDiaryKey } from '@/models';
import { DiaryBackend } from '@/types';
import { useQuery } from '@tanstack/react-query';

const getMyDiaryList = async (year: number, month: number) => {
	const response = await axiosBase.get('diary', {
		params: {
			year,
			month,
		},
	});
	return response.data?.data;
};

export const useMyDiaryListQuery = (year: number, month: number) => {
	const {
		data = {
			items: [],
			total: 0,
			page: 1,
			limit: 10,
		},
	} = useQuery<{
		items: DiaryBackend[];
	}>({
		queryKey: [QUERY_KEY.currentUserDiaryList, year, month],
		queryFn: () => getMyDiaryList(year, month),
	});

	const currentUserDiaryList = data.items;
	const transformedDiaryList = currentUserDiaryList.map((diary) =>
		transformDiaryKey(diary),
	);

	return { currentUserDiaryList: transformedDiaryList };
};
