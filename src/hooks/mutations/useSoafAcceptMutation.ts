import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from './useGenericMutation';
import { useToast } from '../useToast';
import { QUERY_KEY } from '@/constants';

type SoafRequestParams = {
	requestId: string;
	senderName: string;
};

export const useSoafAcceptMutation = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const createSoafAcceptMutation = useGenericMutation<
		void,
		SoafRequestParams,
		void
	>((params) => `/friend/request/${params?.requestId}/accept`, 'PATCH', {
		onSuccess: (_, params) => {
			toast({
				title: `${params?.senderName}님과 소프를 맺었어요`,
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.NOTIFICATION_LIST],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.FRIEND_LIST],
			});
		},
		onError: () => {
			toast({
				title: '소프 신청 중 오류가 발생했어요',
			});
		},
	});

	return { createSoafAcceptMutation };
};
