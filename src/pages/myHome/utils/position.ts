// 픽셀 좌표를 퍼센트 좌표로 변환
export const getPositionToPercentage = (
	position: { x: number; y: number },
	windowDimensions: { width: number; height: number },
) => {
	return {
		x: parseFloat(((position?.x / windowDimensions.width) * 100).toFixed(2)),
		y: parseFloat(((position?.y / windowDimensions.height) * 100).toFixed(2)),
	};
};

// 퍼센트 좌표를 픽셀 좌표로 변환
export const getPercentageToPosition = (
	percentage: { x: number; y: number },
	windowDimensions: { width: number; height: number },
) => {
	return {
		x: parseFloat(((percentage?.x / 100) * windowDimensions.width).toFixed(2)),
		y: parseFloat(((percentage?.y / 100) * windowDimensions.height).toFixed(2)),
	};
};
