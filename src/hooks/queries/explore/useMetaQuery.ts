import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { MatchingUser } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const getMetaSearchingUsers = async () => {
	const response = await axiosBase.get('diary/metas');
	return response.data?.data;
};

export const useMetaQuery = () => {
	const { data: metaUsers } = useSuspenseQuery<MatchingUser[]>({
		queryKey: [QUERY_KEY.META_DIARY],
		queryFn: () => getMetaSearchingUsers(),
	});

	return { metaUsers };
};
