import { EMOTIONS } from '@/constants';
import { usePressEffect, useRippleEffect } from '@/hooks';
import { EmotionKey } from '@/types';
import { cn } from '@/utils';
import { useRef } from 'react';

type EmotionButtonProps = {
	emotion: EmotionKey;
	selected?: boolean;
	onClick?: (emotion: EmotionKey) => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export const EmotionButton = ({
	emotion,
	selected,
	onClick,
	...props
}: EmotionButtonProps) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const { handlePressEnd, handlePressStart, getPressStyle } = usePressEffect({
		duration: 100,
	});

	const onPressStart = (
		e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
	) => {
		handlePressStart(e);
	};

	const onPressEnd = () => {
		handlePressEnd();
	};

	const colorStyle = selected
		? 'bg-white text-black shadow-shadow1'
		: 'bg-[#F0F1F4] text-gray300';

	const imageOpacity = selected ? 'opacity-100' : 'opacity-0';

	return (
		<button
			id={emotion}
			ref={buttonRef}
			{...props}
			className={cn([
				'relative flex items-center rounded-[16px] h-[52px] p-[15px] overflow-hidden min-w-[163px] transition-all duration-100 ease-in-out',
				colorStyle,
			])}
			onClick={() => onClick?.(emotion)}
			onMouseDown={onPressStart}
			onMouseUp={onPressEnd}
			onTouchStart={onPressStart}
			onTouchEnd={onPressEnd}
			style={getPressStyle(emotion)}
		>
			<span className="z-10">{emotion}</span>
			<img
				src={EMOTIONS[emotion].icon}
				alt="emotion_icon"
				className={cn(
					[
						'absolute right-[-8px] h-[60px] w-[60px] transition-opacity duration-300 ease-in-out z-10',
					],
					imageOpacity,
				)}
			/>
		</button>
	);
};
