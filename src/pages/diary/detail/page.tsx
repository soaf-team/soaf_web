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
import { useDiaryMutations } from '@/hooks/mutations';
import { useFlow } from '@/stackflow';
import { useDiaryStore } from '@/store';
import { useDiaryDetailQuery } from '@/hooks';
import { DiaryReaction } from './DiaryReaction';
import { DiaryContent } from '../_components';

type DiaryDetailPageParams = {
	diaryId: string;
};

const DiaryDetailPage: ActivityComponentType<DiaryDetailPageParams> = ({
	params,
}) => {
	const diaryId = params.diaryId;
	const triggerRef = useRef<HTMLButtonElement>(null);
	const { push } = useFlow();
	const { setDiary } = useDiaryStore();
	const { diary, isLoading, isError } = useDiaryDetailQuery(diaryId);
	const { deleteDiaryMutation } = useDiaryMutations();

	const handleEditDiary = () => {
		setDiary(diary);

		push('EditDiaryPage', { diaryId: diary.id });
	};

	if (isLoading) return null;

	return (
		<Popover>
			<PageLayout
				header={{
					leftSlot: <BackButton />,
					rightSlot: (
						<PopoverTrigger ref={triggerRef}>
							<DotVerticalButton onClick={() => {}} />
						</PopoverTrigger>
					),
				}}
			>
				<div className="flex flex-col justify-between h-full">
					{diary && <DiaryContent diary={diary} isImageClickable />}
					<DiaryReaction reactions={diary.reactions} />
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
