import { useState } from 'react';

export const useWindowDimensions = () => {
	const [windowDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	return windowDimensions;
};
