import { MOOD_RATINGS } from '@/constants';
import { useCheckWebview, usePressEffect } from '@/hooks';
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
	const isWebView = useCheckWebview();
	const { handlePressStart, handlePressEnd, getPressStyle } = usePressEffect({
		scale: 1.1,
		style: {
			opacity: 0.7,
		},
	});

	return (
		<div className="flex gap-[12px]">
			{MOOD_RATINGS.map((level, index) => {
				const isSelected = selectedRating === index + 1;
				const selectedClass = isSelected ? 'opacity-100' : 'opacity-30';

				return (
					<img
						id={`level${index + 1}`}
						onClick={() => handleSelectRating((index + 1) as MoodRating)}
						onMouseDown={isWebView ? undefined : handlePressStart}
						onMouseUp={isWebView ? undefined : handlePressEnd}
						onTouchStart={isWebView ? handlePressStart : undefined}
						onTouchEnd={isWebView ? handlePressEnd : undefined}
						key={index}
						src={level}
						alt={`level${index + 1}`}
						className={cn(['w-[50px] h-[50px]'], selectedClass)}
						style={getPressStyle(`level${index + 1}`)}
					/>
				);
			})}
		</div>
	);
};
