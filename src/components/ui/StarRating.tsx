import { EmptyStarIcon, FullStarIcon, HalfStarIcon } from '@/assets';
import { useState } from 'react';

interface Props {
	onChange: (value: number) => void;
	size?: number;
}

const starsArray = Array.from({ length: 5 });

const calculateStarValue = (
	index: number,
	e: React.MouseEvent<HTMLSpanElement>,
) => {
	const rect = e.currentTarget.getBoundingClientRect();
	const offsetX = e.clientX - rect.left;
	return offsetX < rect.width / 2 ? index + 0.5 : index + 1;
};

export const StarRating = ({ size = 16, onChange }: Props) => {
	const [rating, setRating] = useState<number | null>(null);
	const [hover, setHover] = useState<number | null>(null);

	const updateStarRating = (value: number) => {
		setRating(value);
		onChange(value);
	};

	const handleStarClick = (
		index: number,
		e: React.MouseEvent<HTMLSpanElement>,
	) => {
		const selectedValue = calculateStarValue(index, e);
		updateStarRating(selectedValue);
	};

	const handleMouseOver = (
		index: number,
		e: React.MouseEvent<HTMLSpanElement>,
	) => {
		const hoverValue = calculateStarValue(index, e);
		setHover(hoverValue);
	};

	const renderStar = (index: number) => {
		const value = hover !== null ? hover : rating;

		if (value === null) {
			return (
				<img src={EmptyStarIcon} className="w-full h-full" alt="empty star" />
			);
		}

		const starType =
			value > index + 0.5 ? 'full' : value > index ? 'half' : 'empty';

		const starIcons = {
			full: (
				<img src={FullStarIcon} className="w-full h-full" alt="full star" />
			),
			half: (
				<img src={HalfStarIcon} className="w-full h-full" alt="half star" />
			),
			empty: (
				<img src={EmptyStarIcon} className="w-full h-full" alt="empty star" />
			),
		};

		return starIcons[starType];
	};

	return (
		<div className="flex gap-1">
			{starsArray.map((_, index) => (
				<span
					key={index}
					style={{ width: size, height: size }}
					onClick={(e) => handleStarClick(index, e)}
					onMouseMove={(e) => handleMouseOver(index, e)}
					onMouseLeave={() => setHover(null)}
				>
					{renderStar(index)}
				</span>
			))}
		</div>
	);
};
