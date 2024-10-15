import { useGenericMutation } from './useGenericMutation';

type UserPayloadType = {
	name: string;
	alarm: boolean;
	imgUrl: string;
	status: string;
};

type UserResponseType = {};

export const userMutations = ({ onSuccess }: { onSuccess: () => void }) => {
	const patchUserMutation = useGenericMutation<
		UserPayloadType,
		UserResponseType
	>('/user', 'PATCH', {
		onMutate: () => {},
		onSuccess,
		onError: (error) => {
			console.log(error);
		},
	});

	return { patchUserMutation };
};
