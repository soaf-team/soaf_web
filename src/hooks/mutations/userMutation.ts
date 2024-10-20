import { useGenericMutation } from './useGenericMutation';

export type UserPayloadType = {
	name: string;
	alarm: boolean;
	imgUrl: string;
	status: string;
};

type UserResponseType = {};

export const userMutations = ({ onSuccess }: { onSuccess: () => void }) => {
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

	return { patchUserMutation };
};
