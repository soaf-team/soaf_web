export type MessageType = {
	type:
		| 'LOG'
		| 'LOGOUT'
		| 'REFRESH_TOKEN'
		| 'OPEN_CAMERA'
		| 'OPEN_ALBUM'
		| 'SIGN_OUT';
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
