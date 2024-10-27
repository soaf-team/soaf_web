import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { User } from '@/types';

const getUserProfile = async () => {
	const response = await axiosBase.get('user/profile');
	return response.data.data;
};

export const useUserProfileQuery = () => {
	const { data: userProfile } = useSuspenseQuery<User>({
		queryKey: [QUERY_KEY.userProfile],
		queryFn: getUserProfile,
		staleTime: Infinity,
	});

	return { userProfile };
};
