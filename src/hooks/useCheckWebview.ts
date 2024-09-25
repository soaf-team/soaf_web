import { useEffect, useState } from 'react';

export const useCheckWebview = () => {
	const [isWebView, setIsWebView] = useState(true);

	useEffect(() => {
		const checkWebView = () => {
			const isWebView =
				typeof window !== 'undefined' &&
				// @ts-expect-error
				window.ReactNativeWebView !== undefined;
			setIsWebView(isWebView);
		};

		checkWebView();
	}, []);

	return isWebView;
};
