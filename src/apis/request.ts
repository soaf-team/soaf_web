import { AxiosRequestHeaders } from 'axios';
import { axiosBase } from './axios';

type RequestType<TData = any, THeaders = AxiosRequestHeaders> = {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	data?: TData;
	headers?: THeaders;
};

export const request = async ({ url, method, data, headers }: RequestType) => {
	const response = await axiosBase[
		method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'
	](url, data, { headers });

	return {
		status: response.status,
		data: response.data,
	};
};
