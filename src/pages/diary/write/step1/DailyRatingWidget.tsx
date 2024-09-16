import { MOOD_RATINGS } from '@/constants';
import { MoodRating } from '@/types';
import { cn } from '@/utils';

type DailyRatingWidgetProps = {
	selectedRating: MoodRating | null;
	handleSelectRating: (index: MoodRating) => void;
};

export const DailyRatingWidget = ({
	selectedRating,
	handleSelectRating,
}: DailyRatingWidgetProps) => {
	return (
		<div className="flex gap-[12px]">
			{MOOD_RATINGS.map((level, index) => {
				const isSelected = selectedRating === index + 1;
				const selectedClass = isSelected ? 'opacity-100' : 'opacity-30';

				return (
					<img
						onClick={() => handleSelectRating((index + 1) as MoodRating)}
						key={index}
						src={level}
						alt={`level${index + 1}`}
						className={cn(['w-[50px] h-[50px]'], selectedClass)}
					/>
				);
			})}
		</div>
	);
};
