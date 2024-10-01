import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { transformDiaryKey } from '@/models';
import { useSuspenseQuery } from '@tanstack/react-query';

const getDiaryDetail = async (id: string) => {
	const response = await axiosBase.get(`diary/${id}`);
	console.log(response.data);
	return response.data?.data;
};

export const useDiaryDetailQuery = (id: string) => {
	const { data: diary } = useSuspenseQuery({
		queryKey: [QUERY_KEY.diaryDetail, id],
		queryFn: () => getDiaryDetail(id),
	});

	const transformedDiary = transformDiaryKey(diary);

	return { diary: transformedDiary };
};
