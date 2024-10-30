import { DiaryStatsCard } from '../_components/DiaryStatsCard';
import { cn } from '@/utils';
import { EmotionKey } from '@/types';
import { EMOTIONS } from '@/constants';

type EmotionsOfTheMonthProps = {
	data: {
		[key in EmotionKey]?: number;
	};
};

export const EmotionsOfTheMonth = ({ data }: EmotionsOfTheMonthProps) => {
	const total = Object.values(data).reduce((acc, curr) => acc + curr, 0);

	return (
		<DiaryStatsCard title="이 달의 감정">
			<div className="flex flex-col gap-[16px] items-center">
				{total === 0 ? (
					<p className="body3 text-gray200 min-h-[50px]">
						이 달에는 일기를 작성하지 않았어요.
					</p>
				) : (
					(Object.entries(data) as [EmotionKey, number][])
						.slice(0, 3)
						.map(([emotion, count]) => {
							return (
								<div key={emotion} className="flex gap-[12px] w-full">
									<img
										src={EMOTIONS[emotion].icon}
										alt={emotion}
										className="w-[27px] h-[27px]"
									/>
									<div className="flex flex-col gap-[4px] flex-1 align-start">
										<p className="label3">
											{EMOTIONS[emotion].noun}{' '}
											<span className="body3 text-gray200">
												{count}개 ({Math.round((count / total) * 100)}%)
											</span>
										</p>
										<div
											className={cn([
												'w-full h-[4px] rounded-full',
												EMOTIONS[emotion].color,
											])}
										/>
									</div>
								</div>
							);
						})
				)}
			</div>
		</DiaryStatsCard>
	);
};
