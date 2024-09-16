import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';

// import { axiosBase } from "@/shared/apis";

export const useDiaryQueryByMonth = ({ params }: { params: string }) => {
	const fetchDiariesByMonth = async () => {
		// const response = await axiosBase.get(`/diary/${params}`);
		// return response.data;
		return [
			{
				id: '1',
				date: '2024.04.01',
				title: '화난 하루',
				photos: [
					'https://i.namu.wiki/i/PFZRDH0g-TLSryTjN8LGcqFMrP1dAJncAiAJWPa-_J1hLlZ1yej15NOHbgZGe5DC2bRTaSMGkzfQVXlZc4Ali0ynGC9Xj9ewqdczt_Fr0sFf6dDXxIQTnpHm-qqu__-Mde_-OsGj52AuKHoiagG9LA.webp/48x48',
				],
				content:
					'<p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p><p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p>',
				emotions: [
					'화난',
					'행복한',
					'뿌듯한',
					'설레는',
					'슬픈',
					'외로운',
					'피곤한',
				],
				reactions: ['reaction1', 'reaction2'],
			},
			{
				id: '2',
				date: '2024.04.02',
				title: '피곤한 하루',
				photos: [
					'https://i.namu.wiki/i/PFZRDH0g-TLSryTjN8LGcqFMrP1dAJncAiAJWPa-_J1hLlZ1yej15NOHbgZGe5DC2bRTaSMGkzfQVXlZc4Ali0ynGC9Xj9ewqdczt_Fr0sFf6dDXxIQTnpHm-qqu__-Mde_-OsGj52AuKHoiagG9LA.webp/48x48',
				],
				content:
					'<p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p><p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p>',
				emotions: ['피곤한'],
				reactions: ['reaction1', 'reaction2'],
			},
			{
				id: '3',
				date: '2024.04.4',
				title: '슬픈 하루',
				photos: [
					'https://i.namu.wiki/i/PFZRDH0g-TLSryTjN8LGcqFMrP1dAJncAiAJWPa-_J1hLlZ1yej15NOHbgZGe5DC2bRTaSMGkzfQVXlZc4Ali0ynGC9Xj9ewqdczt_Fr0sFf6dDXxIQTnpHm-qqu__-Mde_-OsGj52AuKHoiagG9LA.webp/48x48',
				],
				content:
					'<p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p><p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p>',
				emotions: ['슬픈'],
				reactions: ['reaction1', 'reaction2'],
			},
			{
				id: '4',
				date: '2024.04.6',
				title: '행복한 하루',
				photos: [
					'https://i.namu.wiki/i/PFZRDH0g-TLSryTjN8LGcqFMrP1dAJncAiAJWPa-_J1hLlZ1yej15NOHbgZGe5DC2bRTaSMGkzfQVXlZc4Ali0ynGC9Xj9ewqdczt_Fr0sFf6dDXxIQTnpHm-qqu__-Mde_-OsGj52AuKHoiagG9LA.webp/48x48',
				],
				content:
					'<p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p><p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p>',
				emotions: ['행복한'],
				reactions: ['reaction1', 'reaction2'],
			},
			{
				id: '5',
				date: '2024.04.7',
				title: '외로운 하루',
				photos: [
					'https://i.namu.wiki/i/PFZRDH0g-TLSryTjN8LGcqFMrP1dAJncAiAJWPa-_J1hLlZ1yej15NOHbgZGe5DC2bRTaSMGkzfQVXlZc4Ali0ynGC9Xj9ewqdczt_Fr0sFf6dDXxIQTnpHm-qqu__-Mde_-OsGj52AuKHoiagG9LA.webp/48x48',
				],
				content:
					'<p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p><p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p>',
				emotions: ['외로운'],
				reactions: ['reaction1', 'reaction2'],
			},
			{
				id: '6',
				date: '2024.04.9',
				title: '설레는 하루',
				photos: [
					'https://i.namu.wiki/i/PFZRDH0g-TLSryTjN8LGcqFMrP1dAJncAiAJWPa-_J1hLlZ1yej15NOHbgZGe5DC2bRTaSMGkzfQVXlZc4Ali0ynGC9Xj9ewqdczt_Fr0sFf6dDXxIQTnpHm-qqu__-Mde_-OsGj52AuKHoiagG9LA.webp/48x48',
				],
				content:
					'<p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p><p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p>',
				emotions: ['설레는'],
				reactions: ['reaction1', 'reaction2'],
			},
			{
				id: '7',
				date: '2024.04.10',
				title: '뿌듯한 하루',
				photos: [
					'https://i.namu.wiki/i/PFZRDH0g-TLSryTjN8LGcqFMrP1dAJncAiAJWPa-_J1hLlZ1yej15NOHbgZGe5DC2bRTaSMGkzfQVXlZc4Ali0ynGC9Xj9ewqdczt_Fr0sFf6dDXxIQTnpHm-qqu__-Mde_-OsGj52AuKHoiagG9LA.webp/48x48',
				],
				content:
					'<p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p><p>오늘은 뭘 잘못먹었는지 배가 고프다.</p><p>근데 오늘 축구해서 그건 좋다!</p>',
				emotions: ['뿌듯한'],
				reactions: ['reaction1', 'reaction2'],
			},
		] as any;
	};

	const { data: diariesByMonth = [] } = useQuery({
		queryKey: [QUERY_KEY.MY_DIARY_BY_MONTH, params],
		queryFn: fetchDiariesByMonth,
	});

	return { diariesByMonth };
};
