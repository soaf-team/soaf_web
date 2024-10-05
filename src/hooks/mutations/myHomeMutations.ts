import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from './useGenericMutation';
import { QUERY_KEY } from '@/constants';
import { MusicContent } from '@/types';

type MyHomePayloadCategory = 'music' | 'movie' | 'book' | 'youtube';

type MyHomePayloadType = {
	category: MyHomePayloadCategory;
	review: string;
	content: MusicContent;
	userId: string;
};

export const myHomeMutations = () => {
	const queryClient = useQueryClient();

	const createMyHomeMutation = useGenericMutation<any, MyHomePayloadType>(
		'/my-home',
		'POST',
		{
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.MY_MUSIC_LIST],
				});
			},
			onError: (error) => {
				console.error(error);
			},
		},
	);

	return { createMyHomeMutation };
};
