import { MoodFlow } from './MoodFlow';
import { MoodDistribution } from './MoodDistribution';
import { EmotionsOfTheMonth } from './EmotionsOfTheMonth';
import { useDiaryStatsQuery } from '@/hooks/queries/diary/useDiaryStatsQuery';

type DiaryStatsProps = {
	currentDate: Date;
};

export const DiaryStats = ({ currentDate }: DiaryStatsProps) => {
	const { totalDetailedEmotions, totalCoreEmotions, dailyEmotions } =
		useDiaryStatsQuery(currentDate.getFullYear(), currentDate.getMonth() + 1);

	return (
		<>
			<MoodFlow
				data={dailyEmotions}
				currentMonth={currentDate.getMonth() + 1}
			/>
			<MoodDistribution data={totalCoreEmotions} />
			<EmotionsOfTheMonth data={totalDetailedEmotions} />
		</>
	);
};
