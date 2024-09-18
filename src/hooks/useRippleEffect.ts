import { useState, useCallback, RefObject } from 'react';

interface RippleStyle {
	left: number;
	top: number;
	width: number;
	height: number;
}

export const useRippleEffect = (duration: number = 500) => {
	const [rippleStyle, setRippleStyle] = useState<RippleStyle | null>(null);
	const [isRippling, setIsRippling] = useState(false);

	const startRipple = useCallback(
		(
			event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
			ref: RefObject<HTMLElement>,
		) => {
			const element = ref.current;
			if (!element) return;

			const rect = element.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x =
				'touches' in event
					? event.touches[0].clientX - rect.left
					: event.clientX - rect.left;
			const y =
				'touches' in event
					? event.touches[0].clientY - rect.top
					: event.clientY - rect.top;

			setRippleStyle({
				left: x,
				top: y,
				width: size * 2,
				height: size * 2,
			});
			setIsRippling(true);
		},
		[],
	);

	const stopRipple = useCallback(() => {
		setIsRippling(false);
	}, []);

	const rippleProps = {
		style: {
			...rippleStyle,
			position: 'absolute' as const,
			borderRadius: '50%',
			backgroundColor: 'rgba(0, 0, 0, 0.1)',
			transform: `translate(-50%, -50%) scale(${isRippling ? 1 : 0})`,
			opacity: isRippling ? 1 : 0,
			transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
			pointerEvents: 'none' as const,
		},
	};

	return {
		rippleProps,
		startRipple,
		stopRipple,
	};
};
