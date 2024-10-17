import { useQueryClient } from '@tanstack/react-query';
import { useGenericMutation } from './useGenericMutation';
import { QUERY_KEY } from '@/constants';
import {
	MusicContent,
	MovieContent,
	BookContent,
	YoutubeContent,
} from '@/types';
import { overlay } from '@/libs';
import { LoadingDotScreen } from '@/components';

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

export const myHomeMutations = (
	id?: number,
	category?: MyHomePayloadCategory,
) => {
	const queryClient = useQueryClient();

	const createMyHomeMutation = useGenericMutation<any, MyHomePayloadType>(
		'/my-home',
		'POST',
		{
			onMutate: () => {
				overlay.open(
					<LoadingDotScreen
						overlayKey="loading-music"
						message="음악을 저장중이에요"
					/>,
				);
			},
			onSuccess: (_, variables) => {
				queryClient.invalidateQueries({
					queryKey: [getQueryKeyByCategory(variables.category, 'list')],
				});
			},
			onError: (error) => {
				console.error(error);
			},
			onSettled: () => {
				setTimeout(() => {
					overlay.close();
				}, 500);
			},
		},
	);

	const updateMyHomeMutation = useGenericMutation<any, MyHomePayloadType>(
		`/my-home/${id}`,
		'PATCH',
		{
			onMutate: () => {
				overlay.open(
					<LoadingDotScreen
						overlayKey="loading-music"
						message="음악 정보를 수정중이에요"
					/>,
				);
			},
			onSuccess: (_, variables) => {
				queryClient.invalidateQueries({
					queryKey: [getQueryKeyByCategory(variables.category, 'detail')],
				});
			},
			onError: (error) => {
				console.error(error);
			},
			onSettled: () => {
				setTimeout(() => {
					overlay.close();
				}, 500);
			},
		},
	);

	const deleteMyHomeMutation = useGenericMutation(`/my-home/${id}`, 'DELETE', {
		onMutate: () => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="loading-music"
					message="등록된 음악을 삭제중이에요"
				/>,
			);
		},
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
		onSettled: () => {
			setTimeout(() => {
				overlay.close();
			}, 500);
		},
	});

	return { createMyHomeMutation, updateMyHomeMutation, deleteMyHomeMutation };
};
