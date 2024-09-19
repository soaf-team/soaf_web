import { useState, useCallback, useRef, useEffect } from 'react';

export const usePressEffect = (
	scale: number = 0.97,
	duration: number = 200,
) => {
	const [isPressed, setIsPressed] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isTouchRef = useRef(false);

	const handlePressStart = useCallback(
		(event: React.MouseEvent | React.TouchEvent) => {
			if (event.type === 'touchstart') {
				isTouchRef.current = true;
			} else {
				isTouchRef.current = false;
			}
			setIsPressed(true);

			if (!isTouchRef.current) {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setIsPressed(false);
				}, duration);
			}
		},
		[duration],
	);

	const handlePressEnd = useCallback(() => {
		if (isTouchRef.current) {
			setIsPressed(false);
		}
	}, []);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const pressStyle = {
		transform: isPressed ? `scale(${scale})` : 'scale(1)',
		transition: `transform ${duration}ms ease`,
	};

	return {
		pressStyle,
		handlePressStart,
		handlePressEnd,
	};
};
