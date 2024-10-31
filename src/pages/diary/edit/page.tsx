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
import { DiaryCancelConfirmDialog } from '../write/_components/DiaryCancelConfirmDialog';
import { useDiaryMutations } from '@/hooks';
import { getImageFromPresignedUrl } from '@/utils/getImageFromPresignedUrl';

type EditDiaryPageParams = {
	diaryId: string;
};

const EditDiaryPage: ActivityComponentType<EditDiaryPageParams> = ({
	params,
}) => {
	const diaryId = params.diaryId;
	const { replace } = useFlow();
	const {
		diary,
		onChangeEmotionOrder,
		onChangeTitle,
		onChangeContent,
		onChangePhotos,
		togglePublic,
		resetAllDiaryState,
	} = useDiaryStore();
	const { updateDiaryMutation } = useDiaryMutations();
	const isUnusualApproach =
		diary.emotions.length === 0 || diary.rating === null || !diary.date;

	const getProxyUrl = (originalUrl: string) => {
		const path = originalUrl.replace(
			'https://contest82-image.kr.object.ncloudstorage.com/',
			'',
		);
		return `/proxy-storage/${path}`;
	};

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
		diary.photos.forEach(async (photo) => {
			if (photo.file) {
				formData.append('imageBox', photo.file);
			} else {
				const proxyUrl = getProxyUrl(photo.previewUrl);
				const file = await getImageFromPresignedUrl(proxyUrl);
				formData.append('imageBox', file);
			}
		});
		updateDiaryMutation.mutate({
			params: { diaryId },
			payload: formData,
		});
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
				<DiaryCancelConfirmDialog popCount={1} type="modify" />
			</PageLayout>
		</Dialog>
	);
};

export default EditDiaryPage;

EditDiaryPage.displayName = 'EditDiaryPage';
