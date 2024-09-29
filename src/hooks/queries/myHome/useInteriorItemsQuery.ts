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

	return { interiorItems: MOCK_INTERIOR_ITEMS };
};

const MOCK_INTERIOR_ITEMS: Interior[] = [
	{
		id: 1,
		name: 'books',
		src: '../assets/icons/my-home/interior/books.svg',
		type: 'hobby',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
	{
		id: 2,
		name: 'movie',
		src: '../assets/icons/my-home/interior/movie.svg',
		type: 'hobby',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
	{
		id: 3,
		name: 'music',
		src: '../assets/icons/my-home/interior/music.svg',
		type: 'hobby',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
	{
		id: 4,
		name: 'picture',
		src: '../assets/icons/my-home/interior/picture.svg',
		type: 'interior',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
	{
		id: 5,
		name: 'plant',
		src: '../assets/icons/my-home/interior/plant.svg',
		type: 'interior',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
	{
		id: 6,
		name: 'sofa',
		src: '../assets/icons/my-home/interior/sofa.svg',
		type: 'interior',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
	{
		id: 7,
		name: 'windowDay',
		src: '../assets/icons/my-home/interior/window-day.svg',
		type: 'interior',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
	{
		id: 8,
		name: 'windowNight',
		src: '../assets/icons/my-home/interior/window-night.svg',
		type: 'interior',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
	{
		id: 9,
		name: 'youtube',
		src: '../assets/icons/my-home/interior/youtube.svg',
		type: 'hobby',
		position: { x: 0, y: 0 },
		isVisible: true,
	},
];
