import { useState, useRef, useEffect } from 'react';
import { useMyYoutubeDetailQuery } from '@/hooks';
import { useMyHomeMutations } from '@/hooks/mutations';
import { ActivityComponentType } from '@stackflow/react';
import {
	BackButton,
	CustomPopoverContent,
	DotVerticalButton,
	PageLayout,
	Popover,
	PopoverTrigger,
	Dialog,
	CancelConfirmDialog,
} from '@/components';
import { YoutubeItem } from '../_components/YoutubeItem';
import { overlay } from '@/libs';
import { useFlow } from '@/stackflow';
import { ReviewSection } from '../../_components';

interface MyYoutubeDetailPageProps {
	youtubeId: number;
}

const MyYoutubeDetailPage: ActivityComponentType<MyYoutubeDetailPageProps> = ({
	params,
}) => {
	const { youtubeId } = params;
	const { pop } = useFlow();
	const { myYoutubeDetail, isFetching } = useMyYoutubeDetailQuery(youtubeId);
	const { updateMyHomeMutation, deleteMyHomeMutation } = useMyHomeMutations(
		'youtube',
		youtubeId,
	);

	const triggerRef = useRef<HTMLButtonElement>(null);

	const [review, setReview] = useState(myYoutubeDetail?.data.review || '');
	const [isEditing, setIsEditing] = useState(false);

	const handleUpdateSubmit = () => {
		updateMyHomeMutation.mutate({
			userId: myYoutubeDetail?.data.userId || '',
			review,
			category: 'youtube',
		});

		setIsEditing(false);
	};

	const handleCancelClick = async () => {
		await overlay.open(
			<CancelConfirmDialog
				overlayKey="my-music-update-dialog"
				title="수정을 취소할까요?"
				description="수정한 내용은 저장되지 않아요"
				resolve={() => setIsEditing(false)}
			/>,
		);
	};

	const handleDeleteClick = async () => {
		await overlay.open(
			<CancelConfirmDialog
				overlayKey="my-music-delete-dialog"
				title="정말 삭제할까요?"
				description="삭제한 기록은 복원할 수 없어요"
				confirmButtonText="네, 삭제할래요"
				resolve={() => {
					deleteMyHomeMutation.mutate();
					pop();
				}}
			/>,
		);
	};

	useEffect(() => {
		if (myYoutubeDetail && !isFetching) {
			setReview(myYoutubeDetail.data.review || '');
		}
	}, [myYoutubeDetail, isFetching]);

	if (!myYoutubeDetail) return null;

	return (
		<Dialog>
			<Popover>
				<PageLayout
					header={{
						leftSlot: {
							component: (
								<BackButton
									onClick={isEditing ? handleCancelClick : undefined}
								/>
							),
						},
						title: <h1 className="head6b">나의 유튜브</h1>,
						rightSlot: {
							component: isEditing ? (
								<button
									type="submit"
									className="text-black label2"
									onClick={handleUpdateSubmit}
								>
									저장
								</button>
							) : (
								<PopoverTrigger ref={triggerRef}>
									<DotVerticalButton />
								</PopoverTrigger>
							),
						},
					}}
				>
					<div className="flex flex-col gap-[16px]">
						<YoutubeItem type="detail" youtube={myYoutubeDetail?.data} />

						<div className="flex flex-col gap-[16px]">
							<ReviewSection
								title="감상평"
								value={review}
								placeholder="영상을 본 후 어떤 생각이 드셨나요?"
								onChange={(value) => setReview(value)}
								readOnly={!isEditing}
							/>
						</div>
					</div>
				</PageLayout>

				<CustomPopoverContent
					triggerRef={triggerRef}
					onEdit={() => setIsEditing(true)}
					onDelete={handleDeleteClick}
				/>
			</Popover>
		</Dialog>
	);
};

export default MyYoutubeDetailPage;

MyYoutubeDetailPage.displayName = 'MyYoutubeDetailPage';
