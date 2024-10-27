import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { SoafResponseType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface ApiResponse<T> {
	data: T;
	statusCode: number;
}

export const useSentSoafRequestListQuery = () => {
	const { data: sentSoafRequestList } = useSuspenseQuery<
		ApiResponse<SoafResponseType[]>,
		Error,
		ApiResponse<SoafResponseType[]>
	>({
		queryKey: [QUERY_KEY.SENT_SOAF_REQUEST_LIST],
		queryFn: async () => {
			const response = await axiosBase.get<ApiResponse<SoafResponseType[]>>(
				'/friend/requests/sent',
			);
			return response.data;
		},
	});

	return { sentSoafRequestList };
};
