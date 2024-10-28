import { QUERY_KEY } from '@/constants';
import { axiosBase } from '@/apis';
import { Interior } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

interface ApiResponse<T> {
	data: T;
}

interface MyHomeResponse {
	_id: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	items: Interior[];
}

const getMyHome = async () => {
	const res = await axiosBase.get<ApiResponse<MyHomeResponse>>('/room/my-room');
	return res.data;
};

export const useMyHomeDataQuery = () => {
	const { data: myHomeData } = useSuspenseQuery<ApiResponse<MyHomeResponse>>({
		queryKey: [QUERY_KEY.MY_HOME_DATA],
		queryFn: getMyHome,
	});

	return { myHomeData };
};
