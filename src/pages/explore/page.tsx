import { Button, PageLayout } from '@/components';
import { useMyDiaryListQuery, useToast } from '@/hooks';
import { useFlow } from '@/stackflow';
import { DiaryType } from '@/types';
import { overlay, OverlayProps } from '@/libs';
import dayjs from 'dayjs';
import { useState } from 'react';

import { YearMonthSelect } from '@/components/YearMonthSelect';
import { BasicOverlay } from '@/components/overlay';
import { SelectedDiaryOverlay } from './_components';
import { PublicDiaryList } from './_components/PublicDiaryList';
import { cn } from '@/utils';

const PAGE_TITLE = '소울프렌드 탐색';
const PAGE_DESCRIPTION =
	'원하는 일기를 고르고 탐색하기 버튼을 누르면\n비슷한 이야기를 가진 상대의 홈을 탐색할 수 있어요.';
const BUTTON_TEXT_WHEN_NO_DIARY = '일기 작성';
const BUTTON_TEXT_WHEN_DIARY_EXIST = '소프 탐색';
const OVERLAY_DESCRIPTION =
	'일기를 고르지 않으면\n소프 AI가 자동으로 찾아줘요\n소프를 탐색할까요?';

const SoafExplorePage = () => {
	const { replace, push } = useFlow();
	const [currentDate, setCurrentDate] = useState(new Date());

	const { currentUserDiaryList, isLoading, isError } = useMyDiaryListQuery(
		dayjs(currentDate).year(),
		dayjs(currentDate).month() + 1,
	);
	const publicDiaryList = currentUserDiaryList.filter(
		(diary) => diary.isPublic,
	) as (Omit<DiaryType, 'isPublic'> & { isPublic: true })[];

	const [selectedId, setSelectedId] = useState<string>('');

	const handleDiarySelect = (index: number) => {
		const diaryId = currentUserDiaryList[index].id;
		if (selectedId === diaryId) {
			setSelectedId('');
		} else {
			setSelectedId(diaryId);
		}
	};

	const handleButtonClick = async (
		selectedId: string,
		currentUserDiaryList: DiaryType[],
	) => {
		if (!selectedId) {
			await overlay.open(<AutomaticAISearchOverlay overlayKey="ai-search" />);
			push('MatchedUserPage', {});
			return;
		}

		const currentSelectedDiary = currentUserDiaryList.find(
			(diary) => diary.id === selectedId,
		);

		if (currentSelectedDiary) {
			await overlay.open(
				<SelectedDiaryOverlay diary={currentSelectedDiary} overlayKey="" />,
			);
			push('MatchedUserPage', {
				diaryId: currentSelectedDiary.id,
			});
		}
	};

	return (
		<PageLayout className="flex-1">
			<div className="relative flex flex-col justify-center items-center pt-[52px] flex-1">
				<div className="flex flex-col items-center gap-[8px] mb-[22px]">
					<p className="text-[20px] leading-[32px] font-bold">{PAGE_TITLE}</p>

					<div className="flex flex-col items-center font-normal label3 text-gray800">
						<p className="text-center whitespace-pre-line">
							{PAGE_DESCRIPTION}
						</p>
					</div>
				</div>

				<div className="sticky flex justify-center top-0 w-[calc(100%+36px)] pb-[16px] bg-white z-50">
					<YearMonthSelect
						currentDate={currentDate}
						handleCurrentDate={setCurrentDate}
					/>
				</div>

				<PublicDiaryList
					publicDiaryList={publicDiaryList}
					selectedId={selectedId}
					handleDiarySelect={handleDiarySelect}
					isNoAnyDiary={currentUserDiaryList.length === 0}
					isLoading={isLoading}
					isError={isError}
				/>

				<div
					className={cn(
						'fixed bottom-[93px] left-0 right-0 z-50 px-[18px] pb-[25px] pt-[16px]',
						'bg-gradient-to-t from-white to-transparent',
					)}
				>
					<Button
						variant="primary"
						onClick={
							currentUserDiaryList.length === 0
								? () => {
										replace('DiaryCalendarPage', {});
									}
								: () => handleButtonClick(selectedId, currentUserDiaryList)
						}
					>
						{currentUserDiaryList.length === 0
							? BUTTON_TEXT_WHEN_NO_DIARY
							: BUTTON_TEXT_WHEN_DIARY_EXIST}
					</Button>
				</div>
			</div>
		</PageLayout>
	);
};

export default SoafExplorePage;

SoafExplorePage.displayName = 'SoafExplorePage';

const AutomaticAISearchOverlay = ({
	overlayKey,
	resolve,
	reject,
}: OverlayProps) => {
	return (
		<BasicOverlay
			overlayKey={overlayKey}
			backdrop
			leftButton={{
				text: '아니요',
				onClick: () => reject?.('close'),
			}}
			rightButton={{
				text: '네, 탐색할래요',
				onClick: () => resolve?.('search'),
			}}
			onClose={() => reject?.('close')}
		>
			<div className="flex flex-col items-center pt-[18px] leading-6 font-bold">
				<p className="whitespace-pre-line text-center">{OVERLAY_DESCRIPTION}</p>
			</div>
		</BasicOverlay>
	);
};
