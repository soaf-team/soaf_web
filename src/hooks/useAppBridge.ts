import { axiosBase } from '@/apis';
import { chatSocketManager } from '@/libs';
import { useDebounce } from './useDebounce';
import { useCallback, useEffect } from 'react';

export const useAppBridge = () => {
	const { debounced: debouncedSendMessage } = useDebounce(
		(roomId: string, imageArray: string[]) => {
			chatSocketManager.emit('sendMessage', {
				roomId,
				type: 'image',
				content: imageArray,
			});
		},
		1000,
	);

	const handleMessage = useCallback(
		(event: MessageEvent) => {
			try {
				const data: any =
					typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
				const { type, accessToken, refreshToken, imageArray, roomId } = data;

				console.error(data);

				if (type === 'SELECTED_IMAGES' && roomId && imageArray) {
					debouncedSendMessage(roomId, imageArray);
				}

				if (accessToken && refreshToken) {
					axiosBase.defaults.headers['x-access-token'] = accessToken;
					axiosBase.defaults.headers['x-refresh-token'] = refreshToken;
				}
			} catch (error) {
				console.error('Error handling message:', error);
			}
		},
		[debouncedSendMessage],
	);

	useEffect(() => {
		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [handleMessage]);
};
