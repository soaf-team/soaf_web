import axios, { AxiosError } from 'axios';
import { refreshAccessToken } from './refreshAccessToken';
import { sendMessageToApp } from '@/utils';

export const axiosBase = axios.create({
	baseURL:
		'http://default-api-service-77559-26019998-ded2c8967f62.kr.lb.naverncp.com:8443/',
	headers: {
		Authorization: 'Bearer api_secret_soap',
	},
});
axiosBase.defaults.withCredentials = true;
axiosBase.defaults.headers['x-access-token'] =
	`${import.meta.env.VITE_API_TOKEN}`;

axiosBase.interceptors.request.use((config) => {
	console.error('요청 ' + config.url);
	console.error(config);
	return config;
});

axiosBase.interceptors.response.use(
	(response) => {
		console.error(
			'응답 성공 :' + response.config.url + ' : ' + response.status,
		);
		// console.error(response.headers);
		return response;
	},
	async (error: AxiosError) => {
		const { config, response } = error;

		console.error(
			'응답 실패 :' + response?.config.url + ' : ' + response?.status,
		);
		console.error(error);
		if (!config || !response) return Promise.reject(error);

		if (
			error.status === 410 &&
			// @ts-expect-error
			error.response?.data?.message === 'Token has expired'
		) {
			try {
				const { accessToken, refreshToken } = await refreshAccessToken();
				axiosBase.defaults.headers['x-access-token'] = accessToken;
				axiosBase.defaults.headers['x-refresh-token'] = refreshToken;

				return axiosBase(config);
			} catch (refreshError: unknown) {
				console.error(refreshError);
				return Promise.reject(refreshError);
			}
		}

		if (error.status === 401) {
			sendMessageToApp({ type: 'LOGOUT' });
		}
		return Promise.reject(error);
	},
);
