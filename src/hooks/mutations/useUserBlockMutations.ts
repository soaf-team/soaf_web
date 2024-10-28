import { useToast } from '../useToast';
import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from './useGenericMutation';
import { QUERY_KEY } from '@/constants';

type UserPayloadType = {
	userToBlockId: string;
};

type UserResponseType = {
	name: string;
};

export const useUserBlockMutations = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const postBlockUserMutation = useGenericMutation<
		UserResponseType,
		void,
		UserPayloadType
	>('/user/block', 'POST', {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.FRIEND_LIST],
			});
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const deleteBlockUserMutation = useGenericMutation<
		UserResponseType,
		{ userId: string; userName: string; isFriend: boolean },
		void
	>((params) => `/user/unblock/${params?.userId}`, 'DELETE', {
		onSuccess: (_, params) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.BLOCK_USER_LIST],
			});

			toast({
				title: params?.isFriend
					? `${params?.userName}님과 다시 소프가 되었어요`
					: `${params?.userName}님을 차단 해제했어요`,
			});
		},
	});

	return { postBlockUserMutation, deleteBlockUserMutation };
};
