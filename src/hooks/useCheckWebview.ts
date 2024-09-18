import { useEffect, useState } from 'react';

export const useCheckWebview = () => {
	const [isWebView, setIsWebView] = useState(false);

	useEffect(() => {
		const checkWebView = () => {
			const isWebView =
				//@ts-expect-error
				!!window.ReactNativeWebView ||
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent,
				) ||
				window.navigator.userAgent.includes('wv');
			setIsWebView(isWebView);
		};

		checkWebView();
	}, []);

	return isWebView;
};
