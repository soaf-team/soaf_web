import {
	BackButton,
	CustomPopoverContent,
	DotVerticalButton,
	PageLayout,
	Popover,
	PopoverTrigger,
} from '@/components';
import { ActivityComponentType } from '@stackflow/react';
import { useRef } from 'react';
import { useDiaryMutations, useReactionMutation } from '@/hooks/mutations';
import { useDiaryDetailQuery, useUserProfileQuery } from '@/hooks';
import { useFlow } from '@/stackflow';
import { useDiaryStore } from '@/store';
import { DiaryReaction } from './DiaryReaction';
import { DiaryContent } from '../_components';
import { ReactionKeyType } from '@/types';

type DiaryDetailPageParams = {
	diaryId: string;
	isFriend?: boolean;
};

const DiaryDetailPage: ActivityComponentType<DiaryDetailPageParams> = ({
	params,
}) => {
	const { diaryId, isFriend } = params;
	const triggerRef = useRef<HTMLButtonElement>(null);
	const { push } = useFlow();
	const { setDiary } = useDiaryStore();
	const { diary, isLoading } = useDiaryDetailQuery(diaryId);
	const { userProfile } = useUserProfileQuery();

	const { deleteDiaryMutation } = useDiaryMutations();
	const { toggleReactionMutation } = useReactionMutation();

	const userId = userProfile?.id;
	const isMyDiary = diary?.authorId === userId;

	const handleEditDiary = () => {
		setDiary(diary);

		push('EditDiaryPage', { diaryId: diary.id });
	};

	const handleReactionClick = (reactionType: ReactionKeyType) => {
		toggleReactionMutation.mutate({
			params: { diaryId },
			payload: { reactionType },
		});
	};

	if (isLoading) return null;

	return (
		<Popover>
			<PageLayout
				header={{
					leftSlot: {
						component: <BackButton />,
					},
					rightSlot: {
						component: !isFriend && (
							<PopoverTrigger ref={triggerRef}>
								<DotVerticalButton onClick={() => {}} />
							</PopoverTrigger>
						),
					},
				}}
			>
				<div className="flex flex-col justify-between h-full">
					{diary && <DiaryContent diary={diary} isImageClickable />}
					<DiaryReaction
						userId={userId}
						isMyDiary={isMyDiary}
						reactions={diary.reactions}
						handleReactionClick={handleReactionClick}
					/>
				</div>
			</PageLayout>
			<CustomPopoverContent
				triggerRef={triggerRef}
				onEdit={handleEditDiary}
				onDelete={() => {
					deleteDiaryMutation.mutate({ params: { id: diaryId } });
				}}
			></CustomPopoverContent>
		</Popover>
	);
};

export default DiaryDetailPage;

DiaryDetailPage.displayName = 'DiaryDetailPage';
