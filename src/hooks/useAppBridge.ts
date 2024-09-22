import { axiosBase } from '@/apis';
import { useEffect } from 'react';

export const useAppBridge = () => {
	const handleMessage = async (event: MessageEvent) => {
		try {
			const data =
				typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
			const accessToken = data?.accessToken;
			const refreshToken = data?.refreshToken;

			if (accessToken && refreshToken) {
				axiosBase.defaults.headers['x-access-token'] = accessToken;
				axiosBase.defaults.headers['x-refresh-token'] = refreshToken;
			}
		} catch (error: unknown) {
			console.error(error);
		}
	};

	useEffect(() => {
		// @ts-expect-error
		document.addEventListener('message', (e) => handleMessage(e));

		return () => {
			// @ts-expect-error
			document.removeEventListener('message', (e) => handleMessage(e));
		};
	}, []);
};
