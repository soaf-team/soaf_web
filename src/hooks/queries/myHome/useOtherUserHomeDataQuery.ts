import { QUERY_KEY } from '@/constants';
import { axiosBase } from '@/apis';
import { Interior, SoafStatus, User } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

interface ApiResponse<T> {
	data: T;
}

interface OtherUserHomeResponse {
	_id: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	items: Interior[];
	user: User;
	friendshipStatus: SoafStatus;
	remainingDays?: number;
}

const getOtherUserHome = async (userId: string) => {
	const res = await axiosBase.get<ApiResponse<OtherUserHomeResponse>>(
		`/room/${userId}`,
	);
	return res.data;
};

export const useOtherUserHomeDataQuery = (userId: string) => {
	if (!userId) return { otherUserHomeData: null };

	const { data: otherUserHomeData } = useSuspenseQuery<
		ApiResponse<OtherUserHomeResponse>
	>({
		queryKey: [QUERY_KEY.OTHER_USER_HOME_DATA, userId],
		queryFn: () => getOtherUserHome(userId),
	});

	return { otherUserHomeData };
};
