import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const getMyDiaryList = async () => {
	const response = await axiosBase.get('diary');
	return response.data?.data;
};

export const useMyDiaryListQuery = () => {
	const {
		data = {
			items: [],
			total: 0,
			page: 1,
			limit: 10,
		},
	} = useQuery({
		queryKey: [QUERY_KEY.currentUserDiaryList],
		queryFn: getMyDiaryList,
	});

	const currentUserDiaryList = data.items;

	return { currentUserDiaryList };
};
