import { MoodFlow } from './MoodFlow';
import { MoodDistribution } from './MoodDistribution';
import { EmotionsOfTheMonth } from './EmotionsOfTheMonth';
import { useDiaryStatsQuery } from '@/hooks/queries/diary/useDiaryStatsQuery';

type DiaryStatsProps = {
	currentDate: Date;
};

export const DiaryStats = ({ currentDate }: DiaryStatsProps) => {
	const { data } = useDiaryStatsQuery(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
	);

	const totalCoreEmotions = Object.assign(
		{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
		data.totalCoreEmotions,
	);

	const sortedDetailedEmotionList = Object.entries(
		data.totalDetailedEmotions,
	).sort(([, countA], [, countB]) => countB - countA);
	const sortedDetailedEmotions = Object.fromEntries(sortedDetailedEmotionList);

	return (
		<>
			<MoodFlow
				data={data.dailyEmotions}
				currentMonth={currentDate.getMonth() + 1}
			/>
			<MoodDistribution data={totalCoreEmotions} />
			<EmotionsOfTheMonth data={sortedDetailedEmotions} />
		</>
	);
};
