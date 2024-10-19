import { Button, NonDataFallback, PageLayout } from '@/components';
import { useMyDiaryListQuery } from '@/hooks';
import { useFlow } from '@/stackflow';
import { Diary } from '@/types';
import dayjs from 'dayjs';

import { useState } from 'react';
import { DiaryCard } from '../diary/_components/DiaryCard';
import { YearMonthSelect } from '@/components/YearMonthSelect';

const PAGE_TITLE = '소울프렌드 탐색';
const PAGE_DESCRIPTION =
	'원하는 일기를 고르고 탐색하기 버튼을 누르면\n비슷한 이야기를 가진 상대의 홈을 탐색할 수 있어요.';
const NO_DIARY_DESCRIPTION =
	'아직 작성된 일기가 없어요.\n일기를 먼저 작성해야 탐색이 가능해요.';
const BUTTON_TEXT_WHEN_NO_DIARY = '일기 작성';
const BUTTON_TEXT_WHEN_DIARY_EXIST = '소프 탐색';
const SoafExplorePage = () => {
	const { replace, push } = useFlow();
	const [currentDate, setCurrentDate] = useState(new Date());
	const { currentUserDiaryList } = useMyDiaryListQuery(
		dayjs(currentDate).year(),
		dayjs(currentDate).month() + 1,
	);

	const [isSelected, setIsSelected] = useState<Diary[]>([]);

	const handleDiarySelect = (index: number) => {
		setIsSelected((prev) => {
			if (prev.includes(currentUserDiaryList[index])) {
				return prev.filter((diary) => diary !== currentUserDiaryList[index]);
			} else {
				return [...prev, currentUserDiaryList[index]];
			}
		});
	};

	const handleButtonClick = () => {
		if (currentUserDiaryList.length === 0) {
			replace('NewDiaryStep1', {});
			return;
		}

		// TODO: 소프 탐색 기능 추가
		push('MatchedUser', {});
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
						{currentUserDiaryList.map((diary: Diary, index: number) => (
							<DiaryCard
								key={diary.id}
								diary={diary}
								isCheckable
								isSelected={isSelected.includes(diary)}
								onClick={() => handleDiarySelect(index)}
								className={
									index === currentUserDiaryList.length - 1 ? 'mb-[100px]' : ''
								}
							/>
						))}
					</div>
				)}

				<div className="bg-white fixed left-0 right-0 bottom-0 z-50 h-[150px] px-[16px]">
					<Button
						variant="primary"
						disabled={
							currentUserDiaryList.length > 0 && isSelected.length === 0
						}
						onClick={handleButtonClick}
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
