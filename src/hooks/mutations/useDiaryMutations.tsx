import { useFlow } from '@/stackflow';
import { EmotionKey, MoodRating } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { useGenericMutation } from './useGenericMutation';
import { useDiaryStore } from '@/store';
import { overlay } from '@/libs';
import { LoadingDotScreen } from '@/components';
import { useToast } from '../useToast';

type DiaryPayloadType = FormData;

type DiaryResponseType = {
	_id: string;
	title: string;
	date: string;
	content: string;
	imageBox: string[];
	coreEmotion: MoodRating;
	detailedEmotions: EmotionKey[];
	isPublic: boolean;
};

export const useDiaryMutations = () => {
	const { push, pop } = useFlow();
	const { toast } = useToast();
	const { resetAllDiaryState } = useDiaryStore();
	const queryClient = useQueryClient();

	const invalidateDiaryQueries = (diaryId: string) => {
		queryClient.invalidateQueries({
			queryKey: [QUERY_KEY.currentUserDiaryList],
		});
		queryClient.invalidateQueries({
			queryKey: [QUERY_KEY.diaryDetail, diaryId],
		});
	};

	const createDiaryMutation = useGenericMutation<
		DiaryResponseType,
		void,
		DiaryPayloadType
	>('/diary', 'POST', {
		onMutate: () => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="diary_save_loading"
					message="일기를 저장중이에요"
				/>,
			);
		},
		onSuccess: async (response) => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="diary_save_completed"
					message="일기를 저장이 완료됐어요!"
				/>,
			);

			const { _id } = response.data;
			pop(4);
			push('DiaryDetailPage', { diaryId: _id });
			invalidateDiaryQueries(_id);
			resetAllDiaryState();
		},
		onError: (error) => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="diary_save_failed"
					message="일기를 저장에 실패했어요."
				/>,
			);
		},
		onSettled: () => {
			setTimeout(() => {
				overlay.close();
			}, 500);
		},
	});

	const updateDiaryMutation = useGenericMutation<
		DiaryResponseType,
		{ diaryId: string },
		DiaryPayloadType
	>((params) => `/diary/${params?.diaryId}`, 'PATCH', {
		onMutate: () => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="diary_edit_loading"
					message="일기를 수정중이에요"
				/>,
			);
		},
		onSuccess: (response) => {
			const { _id } = response.data;
			pop(1);
			invalidateDiaryQueries(_id);
			overlay.open(
				<LoadingDotScreen
					overlayKey="diary_edit_completed"
					message="일기를 수정이 완료됐어요!"
				/>,
			);
		},
		onError: (error) => {
			overlay.open(
				<LoadingDotScreen
					overlayKey="diary_edit_failed"
					message="일기를 수정에 실패했어요."
				/>,
			);
		},
		onSettled: () => {
			setTimeout(() => {
				overlay.close();
			}, 500);
		},
	});

	const deleteDiaryMutation = useGenericMutation<void, { id: string }, void>(
		(params) => `/diary/${params?.id}`,
		'DELETE',
		{
			onSuccess: () => {
				pop(1);
				toast({
					title: '일기가 삭제되었어요',
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.currentUserDiaryList],
				});
			},
			onError: (error) => {
				toast({
					title: '일기 삭제에 실패했어요',
				});
			},
		},
	);

	return { createDiaryMutation, updateDiaryMutation, deleteDiaryMutation };
};
