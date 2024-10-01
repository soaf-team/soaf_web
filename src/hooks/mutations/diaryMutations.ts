import { useFlow } from '@/stackflow';
import useGenericMutation from './useGenericMutation';
import { DiaryBackend, EmotionKey, MoodRating } from '@/types';

type DiaryPayloadType = {
	title: string;
	date: string;
	content: string;
	imageBox: string[];
	coreEmotion: MoodRating;
	detailedEmotions: EmotionKey[];
	isPublic: boolean;
};

export const diaryMutations = () => {
	const { push } = useFlow();

	const createUserMutation = useGenericMutation<DiaryBackend, DiaryPayloadType>(
		'/diary',
		'POST',
		{
			onSuccess: (response) => {
				push('DiaryDetailPage', { diaryId: response.data._id });
			},
			onError: (error) => {
				console.log(error);
			},
		},
	);

	return { createUserMutation };
};
