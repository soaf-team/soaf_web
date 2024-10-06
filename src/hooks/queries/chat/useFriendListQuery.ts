import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { FriendType } from '@/types';

const getFriendList = async () => {
	const response = await axiosBase.get('/friend/list');
	return response.data?.data;
};

export const useFriendListQuery = () => {
	const { data: friendList } = useSuspenseQuery<FriendType[]>({
		queryKey: [QUERY_KEY.FRIEND_LIST],
		queryFn: () => getFriendList(),
		staleTime: 60 * 60 * 1000,
		gcTime: 60 * 60 * 1000,
	});

	return { friendList };
};
