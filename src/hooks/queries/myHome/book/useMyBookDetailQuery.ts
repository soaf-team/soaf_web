import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { MyBook } from '@/types';

interface ResMyBookDetail {
	data: MyBook;
}

export const useMyBookDetailQuery = (bookId: number) => {
	const fetchMyBookDetail = async () => {
		const response = await axiosBase.get<ResMyBookDetail>(`my-home/${bookId}`);

		return response.data;
	};

	const { data: myBookDetail, isFetching } = useQuery<ResMyBookDetail>({
		queryKey: [QUERY_KEY.MY_BOOK_DETAIL, bookId],
		queryFn: fetchMyBookDetail,
	});

	return { myBookDetail, isFetching };
};
