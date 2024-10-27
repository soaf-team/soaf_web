import {
	ApiResponse,
	useFriendListQuery,
	useSentSoafRequestListQuery,
} from '@/hooks';
import { FriendType, SoafResponseType } from '@/types';

// TODO: enum
type SoafRequestStatus = 'soaf' | 'rejected' | 'pending' | 'normal';

/**
 * 소프 요청 상태를 확인하는 함수
 * @param userId 상태를 확인할 사용자 ID
 * @param friendList 현재 친구 목록
 * @param sentSoafRequestList 보낸 소프 요청 목록
 * @returns SoafRequestStatus
 */
const getSoafRequestStatus = (
	userId: string,
	friendList: FriendType[],
	sentSoafRequestList: ApiResponse<SoafResponseType[]>,
): SoafRequestStatus => {
	// 이미 소프 관계인지 확인
	const isSoaf = friendList.some((friend) => friend.user2Id === userId);
	if (isSoaf) {
		return 'soaf';
	}

	// 해당 유저에게 보낸 요청이 있는지 확인
	const existingRequest = sentSoafRequestList.data.find(
		(request) => request.receiverId === userId,
	);

	if (!existingRequest) {
		return 'normal';
	}

	switch (existingRequest.status.toUpperCase()) {
		case 'PENDING':
			return 'pending';
		case 'REJECTED':
			// 거절된 요청의 경우 마지막 요청 날짜 확인
			const lastRequestDate = new Date(existingRequest.lastRequestDate);
			const today = new Date();
			const daysSinceLastRequest = Math.floor(
				(today.getTime() - lastRequestDate.getTime()) / (1000 * 60 * 60 * 24),
			);

			// 7일이 지났는지 확인
			return daysSinceLastRequest >= 7 ? 'normal' : 'rejected';
		default:
			return 'normal';
	}
};

export const useGetSoafRequestStatus = (userId: string) => {
	const { friendList } = useFriendListQuery();
	const { sentSoafRequestList } = useSentSoafRequestListQuery();

	const status = getSoafRequestStatus(userId, friendList, sentSoafRequestList);

	const lastRequestDate = sentSoafRequestList.data
		.filter((req) => req.senderId === userId)
		.find((req) => req.lastRequestDate)?.lastRequestDate;

	return {
		status,
		lastRequestDate,
	};
};
