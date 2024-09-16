import { axiosBase } from '@/apis';
import { Interior } from '@/types';
import { useQuery } from '@tanstack/react-query';

// TODO: 각 유저마다 인테리어 아이템이나 위치가 다를 것이기 때문에
// 유저 id를 params로 받아와서 해당 유저의 인테리어 아이템을 가져오도록 수정해야 함

export const useInteriorItems = () => {
	const fetchItems = async (): Promise<Interior[]> => {
		const response = await axiosBase.get('/interior-items');
		return response.data;
	};

	const { data: interiorItems = [] as Interior[] } = useQuery<Interior[]>({
		queryKey: ['interiorItems'],
		queryFn: fetchItems,
	});

	return { interiorItems };
};
