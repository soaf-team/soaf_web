export type MessageType = {
	type: 'LOGOUT' | 'REFRESH_TOKEN';
	data?: any;
};

export const sendMessageToApp = (message: MessageType) => {
	if (typeof window === 'undefined') {
		return;
	}

	// @ts-expect-error
	if (window?.ReactNativeWebView?.postMessage) {
		// @ts-expect-error
		window.ReactNativeWebView.postMessage(JSON.stringify(message));
	}
};
