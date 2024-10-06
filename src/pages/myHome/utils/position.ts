export const getPositionToPercentage = (
	position: { x: number; y: number },
	windowDimensions: { width: number; height: number },
) => {
	return {
		x: parseFloat(((position.x / windowDimensions.width) * 100).toFixed(2)),
		y: parseFloat(((position.y / windowDimensions.height) * 100).toFixed(2)),
	};
};

export const getPercentageToPosition = (
	percentage: { x: number; y: number },
	windowDimensions: { width: number; height: number },
) => {
	return {
		x: parseFloat(((percentage.x / 100) * windowDimensions.width).toFixed(2)),
		y: parseFloat(((percentage.y / 100) * windowDimensions.height).toFixed(2)),
	};
};
