import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { MatchingUser } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const getSimilarUsers = async (diaryId: string) => {
	const response = await axiosBase.get('diary/similar-users', {
		params: {
			limit: '8',
			diaryId,
		},
	});
	return response.data?.data;
};

export const useSimilarUserQuery = (diaryId: string) => {
	const { data: similarUser } = useSuspenseQuery<MatchingUser[]>({
		queryKey: [QUERY_KEY.SIMILAR_USER, diaryId],
		queryFn: () => getSimilarUsers(diaryId),
	});

	return { similarUser };
};
