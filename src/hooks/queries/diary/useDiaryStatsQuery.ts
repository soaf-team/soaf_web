import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';
import { EmotionKey, RatingType } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

type DiaryStatsResponse = {
	totalCoreEmotions: { [key in EmotionKey]: number };
	totalDetailedEmotions: { [key in EmotionKey]: number };
	dailyEmotions: {
		date: number;
		emotions: {
			[key in RatingType]: number;
		};
	}[];
};

const getDiaryStats = async (
	year: number,
	month: number,
): Promise<DiaryStatsResponse> => {
	const response = await axiosBase.get('/diary/stats', {
		params: {
			year,
			month,
		},
	});

	return response.data.data;
};

export const useDiaryStatsQuery = (year: number, month: number) => {
	const { data } = useSuspenseQuery<DiaryStatsResponse>({
		queryKey: [QUERY_KEY.DIARY_STATS, year, month],
		queryFn: () => getDiaryStats(year, month),
	});

	const filledCoreEmotions = Object.assign(
		{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
		data.totalCoreEmotions,
	);

	const sortedDetailedEmotionList = Object.entries(
		data.totalDetailedEmotions,
	).sort(([, countA], [, countB]) => countB - countA);
	const sortedDetailedEmotions = Object.fromEntries(sortedDetailedEmotionList);

	return {
		totalDetailedEmotions: sortedDetailedEmotions,
		totalCoreEmotions: filledCoreEmotions,
		dailyEmotions: data.dailyEmotions,
	};
};
