import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { transformDiaryKey } from '@/models';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_DIARY = {
	id: '',
	authorId: '',
	title: '',
	content: '',
	rating: null,
	isPublic: false,
	photos: [],
	emotions: [],
	date: '',
};

const getDiaryDetail = async (id: string) => {
	const response = await axiosBase.get(`diary/${id}`);
	return response.data?.data;
};

export const useDiaryDetailQuery = (id: string) => {
	const {
		data: diary = DEFAULT_DIARY,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [QUERY_KEY.diaryDetail, id],
		queryFn: () => getDiaryDetail(id),
	});

	const transformedDiary = transformDiaryKey(diary);

	return { diary: transformedDiary, isLoading, isError };
};
