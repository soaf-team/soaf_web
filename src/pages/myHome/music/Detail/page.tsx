import { useState, useRef } from 'react';
import { useMyMusicDetailQuery } from '@/hooks';
import { myHomeMutations } from '@/hooks/mutations';
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
import { MusicItem } from '../_components/MusicItem';
import { overlay } from '@/libs';
import { useFlow } from '@/stackflow';
import { ReviewSection } from '../../_components';
import { MusicItemSkeleton } from '../_components/MusicItemSkeleton';

interface MyMusicDetailPageProps {
	musicId: number;
}

const MyMusicDetailPage: ActivityComponentType<MyMusicDetailPageProps> = ({
	params,
}) => {
	const { musicId } = params;
	const { pop } = useFlow();
	const { myMusicDetail, isFetching } = useMyMusicDetailQuery(musicId);
	const { updateMyHomeMutation, deleteMyHomeMutation } =
		myHomeMutations(musicId);

	const triggerRef = useRef<HTMLButtonElement>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [review, setReview] = useState(myMusicDetail?.data.review || '');

	const handleReviewChange = (value: string) => {
		setReview(value);
	};

	const handleUpdateSubmit = () => {
		updateMyHomeMutation.mutate({
			userId: myMusicDetail?.data.userId || '',
			review,
			category: 'music',
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
					deleteMyHomeMutation.mutate(musicId);
					pop();
				}}
			/>,
		);
	};

	if (!myMusicDetail) return null;

	return (
		<Dialog>
			<Popover>
				<PageLayout
					header={{
						leftSlot: (
							<BackButton onClick={isEditing ? handleCancelClick : undefined} />
						),
						title: <h1 className="head6b">나의 음악</h1>,
						rightSlot: isEditing ? (
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
					}}
				>
					<div className="pt-[56px]">
						<div className="flex flex-col gap-[16px]">
							{isFetching ? (
								<MusicItemSkeleton type="detail" />
							) : (
								<MusicItem type="detail" music={myMusicDetail.data} />
							)}

							<div className="flex flex-col gap-[16px]">
								<ReviewSection
									title="감상평"
									value={review}
									onChange={handleReviewChange}
									readOnly={!isEditing}
								/>
							</div>
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

export default MyMusicDetailPage;

MyMusicDetailPage.displayName = 'MyMusicDetailPage';
