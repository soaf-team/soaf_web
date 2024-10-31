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
import { DiaryForm } from '../../_components/DiaryForm';
import { DiaryCancelConfirmDialog } from '../_components/DiaryCancelConfirmDialog';
import { toast, useDiaryMutations } from '@/hooks';

const NewDiaryStep3: ActivityComponentType = () => {
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

	const isInvalid =
		!diary.rating ||
		!diary.date ||
		!diary.title ||
		!diary.content ||
		!diary.emotions;

	const handleSaveDiaryButtonClick = async () => {
		if (isInvalid) {
			toast({
				title: '모든 항목을 입력해주세요.',
			});
			return;
		}

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
					leftSlot: {
						component: <BackButton />,
					},
					rightSlot: {
						component: (
							<DialogTrigger>
								<XButton onClick={() => {}} />
							</DialogTrigger>
						),
					},
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
