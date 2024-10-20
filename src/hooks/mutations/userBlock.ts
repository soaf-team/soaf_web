import { useGenericMutation } from './useGenericMutation';

type UserPayloadType = {
	userToBlockId: string;
};

type UserResponseType = {};

export const userBlockMutations = ({
	onSuccess,
}: {
	onSuccess: () => void;
}) => {
	const postBlockUserMutation = useGenericMutation<
		UserPayloadType,
		void,
		UserResponseType
	>('/user/block', 'POST', {
		onMutate: () => {},
		onSuccess,
		onError: (error) => {
			console.log(error);
		},
	});

	return { postBlockUserMutation };
};
