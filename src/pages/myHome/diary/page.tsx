import {
	AsyncBoundary,
	BackButton,
	Button,
	NonDataFallback,
	PageLayout,
} from '@/components';
import { useMyDiaryListQuery } from '@/hooks';
import { useFlow } from '@/stackflow';
import { useState } from 'react';
import { DiaryFilter } from './_components/DiaryFilter';
import { YearMonthSelect } from '@/components/YearMonthSelect';
import { DiaryList } from '@/components/DiaryList';
import { ActivityComponentType } from '@stackflow/react';
import { DiaryType } from '@/types';

const formatDiaryByPrivacy = (diaries: DiaryType[], isPrivate: boolean) => {
	return diaries.filter((diary) => diary.isPublic === isPrivate);
};

const MyDiaryPage: ActivityComponentType = () => {
	const { push } = useFlow();

	const [currentDate, setCurrentDate] = useState(new Date());
	const [isPrivate, setIsPrivate] = useState(true);

	const { currentUserDiaryList } = useMyDiaryListQuery(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		isPrivate,
	);

	const diaries = formatDiaryByPrivacy(currentUserDiaryList, isPrivate);

	const handleClickWriteDiaryButton = () => {
		push('NewDiaryStep1', {});
	};

	return (
		<PageLayout
			header={{
				title: <span className="head6b">나의 일기</span>,
				leftSlot: <BackButton />,
			}}
		>
			<div className="flex flex-col items-center gap-[22px]">
				<DiaryFilter setIsPrivate={setIsPrivate} />

				<YearMonthSelect
					currentDate={currentDate}
					handleCurrentDate={setCurrentDate}
				/>

				{diaries.length === 0 ? (
					<>
						<div className="w-full absolute_center">
							<NonDataFallback>
								<p>아직 작성된 일기가 없어요.</p>
								<p>오늘의 일기를 작성해보실래요?</p>
							</NonDataFallback>
						</div>
						<div className="fixed_bottom_button">
							<Button variant="primary" onClick={handleClickWriteDiaryButton}>
								일기 작성
							</Button>
						</div>
					</>
				) : (
					<AsyncBoundary>
						<DiaryList diariesByMonth={diaries} />
					</AsyncBoundary>
				)}
			</div>
		</PageLayout>
	);
};

export default MyDiaryPage;

MyDiaryPage.displayName = 'MyDiaryPage';
