import { Button, NonDataFallback, PageLayout } from '@/components';
import { useMyDiaryListQuery, useToast } from '@/hooks';
import { useFlow } from '@/stackflow';
import { DiaryType } from '@/types';
import { overlay, OverlayProps } from '@/libs';
import dayjs from 'dayjs';
import { useState } from 'react';

import { DiaryCard } from '../diary/_components/DiaryCard';
import { YearMonthSelect } from '@/components/YearMonthSelect';
import { BasicOverlay } from '@/components/overlay';
import { SelectedDiaryOverlay } from './_components';

const PAGE_TITLE = '소울프렌드 탐색';
const PAGE_DESCRIPTION =
	'원하는 일기를 고르고 탐색하기 버튼을 누르면\n비슷한 이야기를 가진 상대의 홈을 탐색할 수 있어요.';
const NO_DIARY_DESCRIPTION =
	'아직 작성된 일기가 없어요.\n일기를 먼저 작성해야 탐색이 가능해요.';
const BUTTON_TEXT_WHEN_NO_DIARY = '일기 작성';
const BUTTON_TEXT_WHEN_DIARY_EXIST = '소프 탐색';
const SoafExplorePage = () => {
	const { replace, push } = useFlow();
	const { toast } = useToast();
	const [currentDate, setCurrentDate] = useState(new Date());
	const { currentUserDiaryList } = useMyDiaryListQuery(
		dayjs(currentDate).year(),
		dayjs(currentDate).month() + 1,
	);

	const [isSelected, setIsSelected] = useState<string[]>([]);

	const handleDiarySelect = (index: number) => {
		const diaryId = currentUserDiaryList[index].id;
		setIsSelected((prev) => {
			if (prev.includes(diaryId)) {
				return prev.filter((id) => id !== diaryId);
			} else {
				return [...prev, diaryId];
			}
		});
	};

	const handleButtonClick = async (
		isSelected: string[],
		currentUserDiaryList: DiaryType[],
	) => {
		if (isSelected.length === 0) {
			await overlay.open(<AutomaticAISearchOverlay overlayKey="ai-search" />);
			return;
		}

		if (isSelected.length > 1) {
			toast({
				title: '일기는 1개만 선택 가능해요',
			});
			return;
		}

		const currentSelectedDiary = currentUserDiaryList.find(
			(diary) => diary.id === isSelected[0],
		);

		if (currentSelectedDiary) {
			await overlay.open(
				<SelectedDiaryOverlay diary={currentSelectedDiary} overlayKey="" />,
			);
		}
	};

	return (
		<PageLayout className="overflow-y-auto">
			<div className="flex flex-col justify-center items-center pt-[56px]">
				<div className="flex flex-col items-center gap-[8px] mb-[22px]">
					<p className="text-[20px] leading-[32px] font-bold">{PAGE_TITLE}</p>

					<div className="flex flex-col items-center font-normal label3 text-gray800">
						<p className="text-center whitespace-pre-line">
							{PAGE_DESCRIPTION}
						</p>
					</div>
				</div>

				<YearMonthSelect
					currentDate={currentDate}
					handleCurrentDate={setCurrentDate}
				/>

				{currentUserDiaryList.length === 0 ? (
					<div className="w-full absolute_center">
						<NonDataFallback>
							<p className="whitespace-pre-line text-center">
								{NO_DIARY_DESCRIPTION}
							</p>
						</NonDataFallback>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center gap-[12px] w-[95%] mt-[24px]">
						{currentUserDiaryList.map((diary: DiaryType, index: number) => {
							return (
								<DiaryCard
									key={diary.id}
									diary={diary}
									isCheckable
									isSelected={isSelected.includes(diary.id)}
									onClick={() => handleDiarySelect(index)}
									className={
										index === currentUserDiaryList.length - 1
											? 'mb-[100px]'
											: ''
									}
								/>
							);
						})}
					</div>
				)}

				<div className="bg-white fixed left-0 right-0 bottom-0 z-50 h-[150px] px-[16px]">
					<Button
						variant="primary"
						onClick={
							currentUserDiaryList.length === 0
								? () => {}
								: () => handleButtonClick(isSelected, currentUserDiaryList)
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
				<p>일기를 고르지 않으면</p>
				<p>소프 AI가 자동으로 찾아줘요</p>
				<p>소프를 탐색할까요?</p>
			</div>
		</BasicOverlay>
	);
};
