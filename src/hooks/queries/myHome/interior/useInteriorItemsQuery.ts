import { axiosBase } from '@/apis';
import { Interior } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
interface Response {
	data: {
		_id: string;
		userId: string;
		createdAt: Date;
		updatedAt: Date;
		items: Interior[];
	};
}

export const useInteriorItems = (userId?: string) => {
	const fetchItems = async (): Promise<Response> => {
		const url = userId ? `/room/${userId}` : '/room';

		const response = await axiosBase.get(url);
		return response.data;
	};

	const { data: interiorItems } = useSuspenseQuery<Response>({
		queryKey: ['interiorItems'],
		queryFn: fetchItems,
	});

	return { interiorItems };
};
