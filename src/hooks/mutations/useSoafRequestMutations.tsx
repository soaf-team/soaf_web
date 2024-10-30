import { useGenericMutation } from './useGenericMutation';
import { useToast } from '../useToast';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { SoafRequestPayloadType } from '@/types';

export const useSoafRequestMutations = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const createSoafRequestMutation = useGenericMutation<
		void,
		void,
		SoafRequestPayloadType
	>('/friend/request', 'POST', {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.SENT_SOAF_REQUEST_LIST],
			});
			toast({
				title: '두 분의 소중한 인연을 응원합니다.',
			});
		},
		onError: () => {
			toast({
				title: '소프 신청 중 오류가 발생했어요',
			});
		},
	});

	const deleteSoafRequestMutation = useGenericMutation<
		void,
		{ requestId: string },
		void
	>((params) => `/friend/request/${params?.requestId}`, 'DELETE', {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.NOTIFICATION_LIST],
			});
			toast({
				title: '알림이 삭제되었어요',
			});
		},
	});

	return { createSoafRequestMutation, deleteSoafRequestMutation };
};
