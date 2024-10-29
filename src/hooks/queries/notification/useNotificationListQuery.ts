import { useSuspenseQuery } from '@tanstack/react-query';
import { axiosBase } from '@/apis';
import { QUERY_KEY } from '@/constants';

// TODO: reponse 타입 정의 필요

interface ApiResponse<T> {
	data: T;
}

export type NotifyType = {
	_id: string;
	lastRequestDate: string;
	message: string;
	senderId: string;
	senderName: string;
	status: 'empty' | 'rejected' | 'pending' | 'accept';
};

const getNotificationList = async () => {
	const res = await axiosBase.get('/friend/requests/received');
	return res.data;
};

export const useNotificationListQuery = () => {
	const { data } = useSuspenseQuery<ApiResponse<NotifyType[]>>({
		queryKey: [QUERY_KEY.NOTIFICATION_LIST],
		queryFn: getNotificationList,
	});

	const notificationList = data.data;

	return { notificationList };
};

// response

// {
//     "data": [
//         {
//             "_id": "67207d57b39a0a062736f8ad",
//             "senderId": "67207d20b39a0a062736f8a0",
//             "receiverId": "67207d25b39a0a062736f8a3",
//             "message": "hello",
//             "status": "pending",
//             "lastRequestDate": "2024-10-29T06:14:47.195Z",
//             "createdAt": "2024-10-29T06:14:47.195Z",
//             "updatedAt": "2024-10-29T06:14:47.195Z",
//             "senderName": "test_01"
//         },
//         {
//             "_id": "67207db9b39a0a062736f8b9",
//             "senderId": "67207d2cb39a0a062736f8a6",
//             "receiverId": "67207d25b39a0a062736f8a3",
//             "message": "hi, I want to be a friend with u",
//             "status": "pending",
//             "lastRequestDate": "2024-10-29T06:16:25.481Z",
//             "createdAt": "2024-10-29T06:16:25.481Z",
//             "updatedAt": "2024-10-29T06:16:25.481Z",
//             "senderName": "test_03"
//         }
//     ],
//     "statusCode": 200
// }
