import { useState, useCallback, useRef, useEffect } from 'react';

type PressEffectProps = {
	scale?: number;
	duration?: number;
	style?: React.CSSProperties;
};

export const usePressEffect = ({
	scale = 0.97,
	duration = 200,
	style,
}: PressEffectProps) => {
	const [pressedId, setPressedId] = useState<string | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isTouchRef = useRef(false);

	const handlePressStart = useCallback(
		(event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
			const target = event.currentTarget;
			if (!target.id) {
				console.warn('Element does not have an id');
				return;
			}

			if (event.type === 'touchstart') {
				isTouchRef.current = true;
			} else {
				isTouchRef.current = false;
			}
			setPressedId(target.id);

			if (!isTouchRef.current) {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setPressedId(null);
				}, duration);
			}
		},
		[duration],
	);

	const handlePressEnd = useCallback(() => {
		if (isTouchRef.current) {
			setPressedId(null);
		}
	}, []);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const getPressStyle = (id: string) => ({
		transform: pressedId === id ? `scale(${scale})` : 'scale(1)',
		transition: `all ${duration}ms ease`,
		...(pressedId === id ? style : {}),
	});

	return {
		handlePressStart,
		handlePressEnd,
		getPressStyle,
	};
};
