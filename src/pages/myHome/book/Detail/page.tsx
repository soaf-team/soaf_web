import { useState, useRef, useEffect } from 'react';
import { useMyBookDetailQuery } from '@/hooks';
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
import { BookItem } from '../_components/BookItem';
import { overlay } from '@/libs';
import { useFlow } from '@/stackflow';
import { ReviewSection } from '../../_components';
import { BookContent, RatingType } from '@/types';

interface MyBookDetailPageProps {
	bookId: number;
	userId: string;
	userName: string;
}

const MyBookDetailPage: ActivityComponentType<MyBookDetailPageProps> = ({
	params,
}) => {
	const { bookId, userId, userName } = params;
	const { pop } = useFlow();
	const { myBookDetail, isFetching } = useMyBookDetailQuery(bookId);
	const { updateMyHomeMutation, deleteMyHomeMutation } = useMyHomeMutations(
		'book',
		bookId,
	);

	const triggerRef = useRef<HTMLButtonElement>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [detailData, setDetailData] = useState<{
		review: string;
		story: string;
		rating: RatingType;
	}>({
		review: myBookDetail?.data.review || '',
		story: myBookDetail?.data.content.story || '',
		rating: myBookDetail?.data.content.rating || 0,
	});

	const readOnly = !isEditing;

	const handleDataChange = (key: string, value: string | RatingType) => {
		setDetailData((prev) => ({ ...prev, [key]: value }));
	};

	const handleUpdateSubmit = () => {
		updateMyHomeMutation.mutate({
			userId: myBookDetail?.data.userId || '',
			review: detailData.review,
			content: {
				story: detailData.story,
				rating: detailData.rating,
			} as BookContent,
			category: 'book',
		});

		setIsEditing(false);
	};

	const handleCancelClick = async () => {
		await overlay.open(
			<CancelConfirmDialog
				overlayKey="my-music-update-dialog"
				title="수정을 취소할까요?"
				description="수정한 내용은 저장되지 않아요"
				resolve={() => {
					setIsEditing(false);
					pop();
				}}
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
		if (myBookDetail && !isFetching) {
			setDetailData({
				review: myBookDetail.data.review || '',
				story: myBookDetail.data.content.story || '',
				rating: myBookDetail.data.content.rating || 0,
			});
		}
	}, [myBookDetail, isFetching]);

	if (!myBookDetail) return null;

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
						title: (
							<h1 className="head6b">
								{userId ? `${userName}님의` : '나의'} 도서
							</h1>
						),
						rightSlot: {
							component: isEditing ? (
								<button
									type="submit"
									className="text-black label2"
									onClick={handleUpdateSubmit}
								>
									저장
								</button>
							) : !userId ? (
								<PopoverTrigger ref={triggerRef}>
									<DotVerticalButton />
								</PopoverTrigger>
							) : null,
						},
					}}
				>
					<div className="flex flex-col gap-[16px]">
						<BookItem
							type="detail"
							book={myBookDetail?.data}
							readOnly={readOnly}
							onRatingChange={(value) => handleDataChange('rating', value)}
						/>

						<div className="flex flex-col gap-[16px]">
							<ReviewSection
								title="감상평"
								value={detailData.review}
								placeholder="책을 읽은 후 어떤 생각이 드셨나요?"
								onChange={(value) => handleDataChange('review', value)}
								readOnly={readOnly}
							/>

							<ReviewSection
								title="줄거리"
								placeholder="이 도서는 어떤 내용인가요?"
								value={detailData.story}
								onChange={(value) => handleDataChange('story', value)}
								readOnly={readOnly}
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

export default MyBookDetailPage;

MyBookDetailPage.displayName = 'MyBookDetailPage';
