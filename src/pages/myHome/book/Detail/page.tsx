import { useState, useRef, useEffect } from 'react';
import { useMyBookDetailQuery } from '@/hooks';
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
import { BookItem } from '../_components/BookItem';
import { overlay } from '@/libs';
import { useFlow } from '@/stackflow';
import { ReviewSection } from '../../_components';

interface MyBookDetailPageProps {
	bookId: number;
}

const MyBookDetailPage: ActivityComponentType<MyBookDetailPageProps> = ({
	params,
}) => {
	const { bookId } = params;
	const { pop } = useFlow();
	const { myBookDetail, isFetching } = useMyBookDetailQuery(bookId);
	const { updateMyHomeMutation, deleteMyHomeMutation } = myHomeMutations(
		'book',
		bookId,
	);

	const triggerRef = useRef<HTMLButtonElement>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [detailData, setDetailData] = useState<{
		review: string;
		story: string;
	}>({
		review: myBookDetail?.data.review || '',
		story: myBookDetail?.data.content.story || '',
	});

	const handleDataChange = (key: string, value: string) => {
		setDetailData((prev) => ({ ...prev, [key]: value }));
	};

	const handleUpdateSubmit = () => {
		updateMyHomeMutation.mutate({
			userId: myBookDetail?.data.userId || '',
			review: detailData.review,
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
		if (myBookDetail && !isFetching) {
			setDetailData({
				review: myBookDetail.data.review || '',
				story: myBookDetail.data.content.story || '',
			});
		}
	}, [myBookDetail, isFetching]);

	if (!myBookDetail) return null;

	return (
		<Dialog>
			<Popover>
				<PageLayout
					header={{
						leftSlot: (
							<BackButton onClick={isEditing ? handleCancelClick : undefined} />
						),
						title: <h1 className="head6b">나의 도서</h1>,
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
							<BookItem type="detail" book={myBookDetail?.data} />

							<div className="flex flex-col gap-[16px]">
								<ReviewSection
									title="감상평"
									value={detailData.review}
									placeholder="책을 읽은 후 어떤 생각이 드셨나요?"
									onChange={(value) => handleDataChange('review', value)}
									readOnly={!isEditing}
								/>

								<ReviewSection
									title="줄거리"
									placeholder="어떤 내용의 책인지 간략하게 소개해주세요."
									value={detailData.story}
									onChange={(value) => handleDataChange('story', value)}
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

export default MyBookDetailPage;

MyBookDetailPage.displayName = 'MyBookDetailPage';
