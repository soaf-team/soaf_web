import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const getUserProfile = async () => {
	const response = await axiosBase.get('user/profile');
	return response.data.data;
};

export const useUserProfileQuery = () => {
	const { data: userProfile } = useQuery({
		queryKey: [QUERY_KEY.userProfile],
		queryFn: getUserProfile,
	});

	return { userProfile };
};
