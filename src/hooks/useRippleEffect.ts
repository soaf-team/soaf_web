import { useState, useCallback, RefObject, useRef, useEffect } from 'react';

type RippleStyle = {
	left: number;
	top: number;
	width: number;
	height: number;
};

type RippleEffectProps = {
	rippleColor?: string;
	duration?: number;
};

export const useRippleEffect = ({
	rippleColor = 'rgba(0, 0, 0, 0.1)',
	duration = 400,
}: RippleEffectProps) => {
	const [rippleStyle, setRippleStyle] = useState<RippleStyle | null>(null);
	const [isRippling, setIsRippling] = useState(false);
	const rippleTimerRef = useRef<NodeJS.Timeout | null>(null);
	const isMouseDownRef = useRef(false);

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

			if ('touches' in event) {
				// 터치 이벤트일 경우
				isMouseDownRef.current = true;
			} else {
				// 클릭 이벤트일 경우
				if (rippleTimerRef.current) {
					clearTimeout(rippleTimerRef.current);
				}
				rippleTimerRef.current = setTimeout(() => {
					setIsRippling(false);
				}, duration);
			}
		},
		[duration],
	);

	const stopRipple = useCallback(() => {
		if (isMouseDownRef.current) {
			// 터치 이벤트에서 손을 뗐을 때
			setIsRippling(false);
			isMouseDownRef.current = false;
		}
		// 클릭 이벤트의 경우 타이머가 동작하므로 여기서는 아무 것도 하지 않음
	}, []);

	useEffect(() => {
		return () => {
			if (rippleTimerRef.current) {
				clearTimeout(rippleTimerRef.current);
			}
		};
	}, []);

	const rippleProps = {
		style: {
			...rippleStyle,
			position: 'absolute' as const,
			borderRadius: '50%',
			backgroundColor: rippleColor,
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
