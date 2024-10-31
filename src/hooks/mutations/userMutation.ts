import { useFlow } from '@/stackflow';
import { useGenericMutation } from './useGenericMutation';
import { useToast } from '../useToast';

interface ApiResponse<T> {
	data: T;
}

export type UserPayloadType = {
	name: string;
	alarm: boolean;
	imgUrl: string;
	status: string;
};

type UserResponseType = {};

export const userMutations = ({ onSuccess }: { onSuccess: () => void }) => {
	const { replace } = useFlow();
	const { toast } = useToast();

	const validateUserNameMutation = useGenericMutation<
		ApiResponse<boolean>,
		{ name: string },
		void
	>((params) => `/user/check-name/${params?.name}`, 'GET', {
		onSuccess: (data) => {
			return data.data;
		},
	});

	const logoutUserMutation = useGenericMutation<void, void, void>(
		'/user/logout',
		'POST',
		{
			onSuccess: () => {
				toast({
					title: '로그아웃 되었어요',
				});
			},
		},
	);

	const deleteUserMutation = useGenericMutation<void, void, void>(
		'/user/delete',
		'DELETE',
		{
			onSuccess: () => {
				toast({
					title: '회원 탈퇴가 완료되었어요',
				});
			},
		},
	);

	const patchUserMutation = useGenericMutation<
		UserPayloadType,
		void,
		UserResponseType
	>('/user', 'PATCH', {
		onMutate: () => {},
		onSuccess,
		onError: (error) => {
			console.log(error);
		},
	});

	return {
		patchUserMutation,
		logoutUserMutation,
		deleteUserMutation,
		validateUserNameMutation,
	};
};
