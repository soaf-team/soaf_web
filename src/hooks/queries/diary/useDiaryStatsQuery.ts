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

	return { data };
};
