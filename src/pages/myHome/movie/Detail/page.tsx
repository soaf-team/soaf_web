import { useState, useRef, useEffect } from 'react';
import { useMyMovieDetailQuery } from '@/hooks';
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
import { MovieItem } from '../_components/MovieItem';
import { overlay } from '@/libs';
import { useFlow } from '@/stackflow';
import { ReviewSection } from '../../_components';

interface MyMovieDetailPageProps {
	movieId: number;
}

const MyMovieDetailPage: ActivityComponentType<MyMovieDetailPageProps> = ({
	params,
}) => {
	const { movieId } = params;
	const { pop } = useFlow();
	const { myMovieDetail, isFetching } = useMyMovieDetailQuery(movieId);
	const { updateMyHomeMutation, deleteMyHomeMutation } = myHomeMutations(
		'movie',
		movieId,
	);

	const triggerRef = useRef<HTMLButtonElement>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [detailData, setDetailData] = useState<{
		review: string;
		actors: string;
		story: string;
	}>({
		review: myMovieDetail?.data.review || '',
		actors: myMovieDetail?.data.content.actors.join(', ') || '',
		story: myMovieDetail?.data.content.story || '',
	});

	const handleDataChange = (key: string, value: string) => {
		setDetailData((prev) => ({ ...prev, [key]: value }));
	};

	const handleUpdateSubmit = () => {
		updateMyHomeMutation.mutate({
			userId: myMovieDetail?.data.userId || '',
			review: detailData.review,
			category: 'movie',
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
					deleteMyHomeMutation.mutate(movieId);
					pop();
				}}
			/>,
		);
	};

	useEffect(() => {
		if (myMovieDetail && !isFetching) {
			setDetailData({
				review: myMovieDetail.data.review || '',
				actors: myMovieDetail.data.content.actors.join(', ') || '',
				story: myMovieDetail.data.content.story || '',
			});
		}
	}, [myMovieDetail, isFetching]);

	if (!myMovieDetail) return null;

	return (
		<Dialog>
			<Popover>
				<PageLayout
					header={{
						leftSlot: (
							<BackButton onClick={isEditing ? handleCancelClick : undefined} />
						),
						title: <h1 className="head6b">나의 영화</h1>,
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
							<MovieItem type="detail" movie={myMovieDetail?.data} />

							<div className="flex flex-col gap-[16px]">
								<ReviewSection
									title="감상평"
									value={detailData.review}
									placeholder="영화를 본 후 어떤 생각이 드셨나요?"
									onChange={(value) => handleDataChange('review', value)}
									readOnly={!isEditing}
								/>

								<ReviewSection
									title="배우"
									value={detailData.actors}
									onChange={(value) => handleDataChange('actors', value)}
									readOnly={!isEditing}
								/>

								<ReviewSection
									title="줄거리"
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

export default MyMovieDetailPage;

MyMovieDetailPage.displayName = 'MyMovieDetailPage';
