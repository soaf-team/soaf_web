import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from './useGenericMutation';
import { QUERY_KEY } from '@/constants';
import {
	MusicContent,
	MovieContent,
	BookContent,
	YoutubeContent,
} from '@/types';

type MyHomePayloadCategory = 'music' | 'movie' | 'book' | 'youtube';

type MyHomePayloadType = {
	category: MyHomePayloadCategory;
	review: string;
	content?: MusicContent | MovieContent | BookContent | YoutubeContent;
	userId: string;
};

const getQueryKeyByCategory = (
	category: MyHomePayloadCategory,
	type: 'list' | 'detail',
) => {
	switch (category) {
		case 'music':
			return type === 'list'
				? QUERY_KEY.MY_MUSIC_LIST
				: QUERY_KEY.MY_MUSIC_DETAIL;
		case 'movie':
			return type === 'list'
				? QUERY_KEY.MY_MOVIE_LIST
				: QUERY_KEY.MY_MOVIE_DETAIL;
		case 'book':
			return type === 'list'
				? QUERY_KEY.MY_BOOK_LIST
				: QUERY_KEY.MY_BOOK_DETAIL;
		case 'youtube':
			return type === 'list'
				? QUERY_KEY.MY_YOUTUBE_LIST
				: QUERY_KEY.MY_YOUTUBE_DETAIL;
		default:
			return '';
	}
};

// TODO: omMutate로 로딩 페이지 넣기 (일기 참고)

export const myHomeMutations = (
	id?: number,
	category?: MyHomePayloadCategory,
) => {
	const queryClient = useQueryClient();

	const createMyHomeMutation = useGenericMutation<any, MyHomePayloadType>(
		'/my-home',
		'POST',
		{
			onSuccess: (_, variables) => {
				queryClient.invalidateQueries({
					queryKey: [getQueryKeyByCategory(variables.category, 'list')],
				});
			},
			onError: (error) => {
				console.error(error);
			},
		},
	);

	const updateMyHomeMutation = useGenericMutation<any, MyHomePayloadType>(
		`/my-home/${id}`,
		'PATCH',
		{
			onSuccess: (_, variables) => {
				queryClient.invalidateQueries({
					queryKey: [getQueryKeyByCategory(variables.category, 'detail')],
				});
			},
			onError: (error) => {
				console.error(error);
			},
		},
	);

	const deleteMyHomeMutation = useGenericMutation(`/my-home/${id}`, 'DELETE', {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [
					getQueryKeyByCategory(category as MyHomePayloadCategory, 'list'),
				],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return { createMyHomeMutation, updateMyHomeMutation, deleteMyHomeMutation };
};
