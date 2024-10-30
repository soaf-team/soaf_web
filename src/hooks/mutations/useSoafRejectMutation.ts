import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from './useGenericMutation';
import { useToast } from '../useToast';
import { QUERY_KEY } from '@/constants';

type SoafRequestParams = {
	requestId: string;
};

export const useSoafRejectMutation = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const createSoafRejectMutation = useGenericMutation<
		void,
		SoafRequestParams,
		void
	>((params) => `/friend/request/${params?.requestId}/reject`, 'PATCH', {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.NOTIFICATION_LIST],
			});
			toast({
				title: '거절된 유저는 일주일 후 소프 재신청이 가능합니다',
			});
		},
		onError: () => {
			toast({
				title: '소프 신청 중 오류가 발생했어요',
			});
		},
	});

	return { createSoafRejectMutation };
};
