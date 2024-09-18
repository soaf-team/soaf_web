import { useState, useCallback } from 'react';

export const usePressEffect = (scale: number = 0.97) => {
	const [isPressed, setIsPressed] = useState(false);

	const handlePressStart = useCallback(() => {
		setIsPressed(true);
	}, []);

	const handlePressEnd = useCallback(() => {
		setIsPressed(false);
	}, []);

	const pressStyle = {
		transform: isPressed ? `scale(${scale})` : 'scale(1)',
		transition: 'transform 0.3s ease',
	};

	return {
		pressStyle,
		handlePressStart,
		handlePressEnd,
	};
};
