import { useFlow } from '@/stackflow';
import { EmotionKey, MoodRating } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { useGenericMutation } from './useGenericMutation';
import { useDiaryStore } from '@/store';
import { overlay } from '@/libs';
import { LoadingDotScreen } from '@/components';

type DiaryPayloadType = {
	title: string;
	date: string;
	content: string;
	imageBox: string[];
	coreEmotion: MoodRating;
	detailedEmotions: EmotionKey[];
	isPublic: boolean;
};

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

export const diaryMutations = () => {
	const { push, pop } = useFlow();
	const { resetAllDiaryState } = useDiaryStore();
	const queryClient = useQueryClient();

	const createUserMutation = useGenericMutation<
		DiaryResponseType,
		DiaryPayloadType
	>('/diary', 'POST', {
		onMutate: () => {
			overlay.open(
				<LoadingDotScreen overlayKey="loading" message="일기를 저장중이에요" />,
			);
		},
		onSuccess: async (response) => {
			const { _id } = response.data;
			pop(4);
			push('DiaryDetailPage', { diaryId: _id });
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.currentUserDiaryList],
			});
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY.diaryDetail, _id] });
			resetAllDiaryState();
		},
		onError: (error) => {
			console.log(error);
		},
		onSettled: () => {
			setTimeout(() => {
				overlay.close();
			}, 500);
		},
	});

	return { createUserMutation };
};
