import { useState } from 'react';

export const useWindowDimensions = () => {
	const [windowDimensions] = useState({
		width: window.innerWidth > 440 ? 440 : window.innerWidth,
		height: window.innerHeight,
	});

	return windowDimensions;
};
