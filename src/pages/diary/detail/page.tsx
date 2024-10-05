import {
	AsyncBoundary,
	BackButton,
	CustomPopoverContent,
	DotVerticalButton,
	ErrorFallback,
	PageLayout,
	Popover,
	PopoverTrigger,
} from '@/components';
import { ActivityComponentType } from '@stackflow/react';
import { DiaryDetail } from './DiaryDetail';
import { useRef } from 'react';

type DiaryDetailPageParams = {
	diaryId: string;
};

const DiaryDetailPage: ActivityComponentType<DiaryDetailPageParams> = ({
	params,
}) => {
	const diaryId = params.diaryId;
	const triggerRef = useRef<HTMLButtonElement>(null);

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
				<AsyncBoundary
					rejectedFallback={({ error, reset }) => (
						<ErrorFallback error={error} reset={() => {}} variant="unknown" />
					)}
				>
					<DiaryDetail diaryId={diaryId} />
				</AsyncBoundary>
			</PageLayout>
			<CustomPopoverContent
				triggerRef={triggerRef}
				onEdit={() => {}}
				onDelete={() => {}}
			></CustomPopoverContent>
		</Popover>
	);
};

export default DiaryDetailPage;

DiaryDetailPage.displayName = 'DiaryDetailPage';
