import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import {
	MusicContent,
	MovieContent,
	BookContent,
	YoutubeContent,
} from '@/types';
import { overlay } from '@/libs';
import { LoadingDotScreen } from '@/components';
import { useToast } from '../useToast';
import { axiosBase } from '@/apis';

type MyHomePayloadCategory = 'music' | 'movie' | 'book' | 'youtube';

const getCategoryMessage = (
	category: MyHomePayloadCategory,
	action: string,
	isLoading: boolean = false,
) => {
	const actionWord = isLoading ? `${action}중이에요` : `${action}되었어요`;
	switch (category) {
		case 'music':
			return `음악이 ${actionWord}`;
		case 'movie':
			return `영화가 ${actionWord}`;
		case 'book':
			return `도서가 ${actionWord}`;
		case 'youtube':
			return `유튜브 영상이 ${actionWord}`;
		default:
			return;
	}
};

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

export const useMyHomeMutations = (
	category: MyHomePayloadCategory,
	id?: number,
) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const createMyHomeMutation = useMutation({
		mutationFn: async (payload: MyHomePayloadType) => {
			const response = await axiosBase.post('/my-home', payload);
			return response.data;
		},
		onMutate: () => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="loading-music"
					message={getCategoryMessage(
						category as MyHomePayloadCategory,
						'저장',
						true,
					)}
				/>,
			);
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: [getQueryKeyByCategory(variables.category, 'list')],
			});
			overlay.close();
			toast({
				title: getCategoryMessage(variables.category, '저장'),
			});
		},
		onError: (error) => {
			console.error(error);
			overlay.close();
		},
	});

	const updateMyHomeMutation = useMutation({
		mutationFn: async (payload: MyHomePayloadType) => {
			const response = await axiosBase.patch(`/my-home/${id}`, payload);
			return response.data;
		},
		onMutate: () => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="loading-music"
					message={getCategoryMessage(
						category as MyHomePayloadCategory,
						'수정',
						true,
					)}
				/>,
			);
		},
		onSuccess: async (_, variables) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [getQueryKeyByCategory(variables.category, 'list')],
				}),
				queryClient.invalidateQueries({
					queryKey: [getQueryKeyByCategory(variables.category, 'detail')],
				}),
			]);
			overlay.close();
			toast({
				title: getCategoryMessage(variables.category, '수정'),
			});
		},
		onError: (error) => {
			console.error(error);
			overlay.close();
		},
	});

	const deleteMyHomeMutation = useMutation({
		mutationFn: async () => {
			const response = await axiosBase.delete(`/my-home/${id}`);
			return response.data;
		},
		onMutate: () => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="loading-music"
					message={getCategoryMessage(
						category as MyHomePayloadCategory,
						'삭제',
						true,
					)}
				/>,
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [
					getQueryKeyByCategory(category as MyHomePayloadCategory, 'list'),
				],
			});
			overlay.close();
			toast({
				title: getCategoryMessage(category as MyHomePayloadCategory, '삭제'),
			});
		},
		onError: (error) => {
			console.error(error);
			overlay.close();
		},
	});

	return { createMyHomeMutation, updateMyHomeMutation, deleteMyHomeMutation };
};
