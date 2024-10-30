import { MOOD_RATING_COLORS, MOOD_RATINGS } from '@/constants';
import { DiaryStatsCard } from '../_components/DiaryStatsCard';
import { BarChart } from '@/components';

type MoodDistributionProps = {
	data: {
		[key: string]: number;
	};
};

const getTotal = (data: { [key: string]: number }) => {
	return Object.values(data).reduce((acc, curr) => acc + curr, 0);
};

export const MoodDistribution = ({ data }: MoodDistributionProps) => {
	const total = getTotal(data);
	const barChartData = Object.entries(data).map(([level, ratio], index) => ({
		level,
		ratio: (ratio / total) * 100,
		color: MOOD_RATING_COLORS[index],
	}));

	return (
		<DiaryStatsCard title="기분 분포">
			<div className="flex flex-col gap-[15px] items-center">
				<div className="flex gap-[12px]">
					{MOOD_RATINGS.map((level, index) => {
						return (
							<div
								key={index}
								className="flex flex-col gap-[8px] w-[42px] justify-center items-center"
							>
								<img
									key={index}
									src={level}
									alt={`level${index + 1}`}
									className="w-[36px] h-[36px]"
								/>
								<span className="label4eb text-gray300">
									{((data[index + 1] / (total || 1)) * 100).toFixed()}%
								</span>
							</div>
						);
					})}
				</div>
				<BarChart data={barChartData} />
			</div>
		</DiaryStatsCard>
	);
};
