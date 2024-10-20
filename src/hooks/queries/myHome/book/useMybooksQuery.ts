import { useQuery } from '@tanstack/react-query';
import { axiosBase } from '@/apis';
import { MyBook } from '@/types';
import { QUERY_KEY } from '@/constants';

// TODO: infinite query

interface ResMyBookList {
	data: MyBook[];
}

export const useMyBooksQuery = (userId: string) => {
	const fetchMyBookList = async () => {
		const response = await axiosBase.get<ResMyBookList>('my-home', {
			params: {
				userId,
				category: 'book',
			},
		});

		return response.data;
	};

	const { data: myBookList, isFetching } = useQuery<ResMyBookList>({
		queryKey: [QUERY_KEY.MY_BOOK_LIST, userId],
		queryFn: fetchMyBookList,
	});

	return { myBookList, isFetching };
};
