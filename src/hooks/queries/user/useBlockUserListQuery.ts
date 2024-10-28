import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { axiosBase } from '@/apis';
import { BlockedUser } from '@/types';

interface ApiResponse<T> {
	data: T;
}

const getBlockUserList = async () => {
	const response = await axiosBase.get<ApiResponse<BlockedUser[]>>(
		'/user/blocked-users',
	);
	return response.data;
};

export const useBlockUserListQuery = () => {
	const { data: blockedUserList } = useSuspenseQuery<
		ApiResponse<BlockedUser[]>
	>({
		queryKey: [QUERY_KEY.BLOCK_USER_LIST],
		queryFn: getBlockUserList,
	});

	return { blockedUserList };
};
