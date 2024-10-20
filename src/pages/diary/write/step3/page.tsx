import { useEffect } from 'react';
import { ActivityComponentType } from '@stackflow/react';

import { useFlow } from '@/stackflow';
import { useDiaryStore } from '@/store';
import {
	BackButton,
	Dialog,
	DialogTrigger,
	PageLayout,
	XButton,
} from '@/components';
import { DiaryForm } from '../_components/DiaryForm';
import { DiaryCancelConfirmDialog } from '../_components/DiaryCancelConfirmDialog';
import { useDiaryMutations } from '@/hooks';

type NewDiaryStep3Props = {
	variant: 'new' | 'edit';
};

const NewDiaryStep3: ActivityComponentType<NewDiaryStep3Props> = ({
	params,
}) => {
	const { replace } = useFlow();
	const { createDiaryMutation } = useDiaryMutations();
	const {
		diary,
		onChangeEmotionOrder,
		onChangeTitle,
		onChangeContent,
		onChangePhotos,
		togglePublic,
		resetAllDiaryState,
	} = useDiaryStore();
	const isUnusualApproach =
		diary.emotions.length === 0 || diary.rating === null || !diary.date;

	const handleSaveDiaryButtonClick = async () => {
		if (!diary.rating) return;

		const formData = new FormData();
		formData.append('title', diary.title);
		formData.append('date', diary.date);
		formData.append('content', diary.content);
		formData.append('coreEmotion', diary.rating!.toString());
		diary.emotions.forEach((emotion) => {
			formData.append('detailedEmotions', emotion);
		});
		formData.append('isPublic', diary.isPublic.toString());
		diary.photos.forEach((photo) => {
			if (photo.file) {
				formData.append('imageBox', photo.file);
			}
		});
		createDiaryMutation.mutate({ payload: formData });
	};

	useEffect(() => {
		if (isUnusualApproach) {
			replace('DiaryCalendarPage', {});
			resetAllDiaryState();
		}
	}, []);

	if (isUnusualApproach) {
		return null;
	}

	return (
		<Dialog>
			<PageLayout
				header={{
					leftSlot: <BackButton />,
					rightSlot: (
						<DialogTrigger>
							<XButton onClick={() => {}} />
						</DialogTrigger>
					),
				}}
			>
				<DiaryForm
					diary={diary}
					handleReorderEmotions={onChangeEmotionOrder}
					handleTitleChange={onChangeTitle}
					handleContentChange={onChangeContent}
					handlePhotosChange={onChangePhotos}
					handleTogglePublic={togglePublic}
					handleSaveDiary={handleSaveDiaryButtonClick}
				/>
				<DiaryCancelConfirmDialog popCount={3} />
			</PageLayout>
		</Dialog>
	);
};

export default NewDiaryStep3;

NewDiaryStep3.displayName = 'NewDiaryStep3';
