import { axiosBase } from '@/apis';
import { useCheckWebview } from '@/hooks';
import React, { useEffect, useState } from 'react';

type Props = {
	children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
	const [isTokenSet, setIsTokenSet] = useState(false);
	const isWebview = useCheckWebview();

	const handleMessage = async (event: MessageEvent) => {
		try {
			const data =
				typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
			const accessToken = data?.accessToken;
			const refreshToken = data?.refreshToken;

			if (accessToken && refreshToken) {
				axiosBase.defaults.headers['x-access-token'] = accessToken;
				axiosBase.defaults.headers['x-refresh-token'] = refreshToken;
				setIsTokenSet(true);
			}
		} catch (error: unknown) {
			console.error(error);
		}
	};

	useEffect(() => {
		// @ts-expect-error
		document.addEventListener('message', handleMessage);
		window.addEventListener('message', handleMessage);

		return () => {
			// @ts-expect-error
			document.removeEventListener('message', handleMessage);
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	if (isWebview && !isTokenSet) return null;

	return children;
};
