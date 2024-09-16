import axios from 'axios';

export const axiosBase = axios.create({
	baseURL: import.meta.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});
