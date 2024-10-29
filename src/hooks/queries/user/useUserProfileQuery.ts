import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { User } from '@/types';
import { AxiosError } from 'axios';
import { sendMessageToApp } from '@/utils';

const getUserProfile = async () => {
	try {
		const response = await axiosBase.get('user/profile');
		return response.data.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 404) {
				sendMessageToApp({
					type: 'LOGOUT',
				});
			}
		}
		throw error;
	}
};

export const useUserProfileQuery = () => {
	const { data: userProfile } = useSuspenseQuery<User>({
		queryKey: [QUERY_KEY.userProfile],
		queryFn: getUserProfile,
		staleTime: Infinity,
	});

	return { userProfile };
};
