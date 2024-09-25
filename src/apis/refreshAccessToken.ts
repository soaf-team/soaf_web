import { axiosBase } from './axios';

export const refreshAccessToken = async (): Promise<{
	accessToken: string;
	refreshToken: string;
}> => {
	const response = await axiosBase.post('user/refresh');

	const cookies = response.headers['set-cookie'];
	if (!cookies || !Array.isArray(cookies)) {
		throw new Error('No cookies in response');
	}

	let accessToken = '';
	let refreshToken = '';

	cookies.forEach((cookie) => {
		if (cookie.startsWith('access_token=')) {
			accessToken = cookie.split(';')[0].split('=')[1];
		} else if (cookie.startsWith('refresh_token=')) {
			refreshToken = cookie.split(';')[0].split('=')[1];
		}
	});

	if (!accessToken || !refreshToken) {
		throw new Error('Tokens not found in cookies');
	}

	return { accessToken, refreshToken };
};
