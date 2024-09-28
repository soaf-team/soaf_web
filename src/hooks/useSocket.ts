import { useEffect, useRef, useCallback } from 'react';
import { Socket, io } from 'socket.io-client';

export const useSocket = (serverPath: string) => {
	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		socketRef.current = io(serverPath);

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, [serverPath]);

	const emit = useCallback((eventName: string, data: any) => {
		if (socketRef.current) {
			socketRef.current.emit(eventName, data);
		}
	}, []);

	const on = useCallback((eventName: string, callback: (data: any) => void) => {
		if (socketRef.current) {
			socketRef.current.on(eventName, callback);
		}
	}, []);

	const off = useCallback(
		(eventName: string, callback?: (data: any) => void) => {
			if (socketRef.current) {
				if (callback) {
					socketRef.current.off(eventName, callback);
				} else {
					socketRef.current.off(eventName);
				}
			}
		},
		[],
	);

	return { emit, on, off };
};
