import { Button, NonDataFallback, PageLayout } from '@/components';
import { useDiaryQueryByMonth } from '@/hooks';
import { useFlow } from '@/stackflow';
import { Diary } from '@/types';
import dayjs from 'dayjs';

import { useState } from 'react';
import { DiaryCard } from '../diary/_components/DiaryCard';
import { YearMonthSelect } from '@/components/YearMonthSelect';

const SoafExplorePage = () => {
	const { replace, push } = useFlow();
	const [currentDate, setCurrentDate] = useState(new Date());
	const { diariesByMonth } = useDiaryQueryByMonth({
		params: dayjs(currentDate).format('YYYY.MM'),
	});

	const [isSelected, setIsSelected] = useState<Diary[]>([]);

	const handleDiarySelect = (index: number) => {
		setIsSelected((prev) => {
			if (prev.includes(diariesByMonth[index])) {
				return prev.filter((diary) => diary !== diariesByMonth[index]);
			} else {
				return [...prev, diariesByMonth[index]];
			}
		});
	};

	const handleButtonClick = () => {
		if (diariesByMonth.length === 0) {
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
					<p className="text-[20px] leading-[32px] font-bold">
						소울프렌드 탐색
					</p>

					<div className="flex flex-col items-center font-normal label3 text-gray800">
						<p>원하는 일기를 고르고 탐색하기 버튼을 누르면</p>
						<p>비슷한 이야기를 가진 상대의 홈을 탐색할 수 있어요.</p>
					</div>
				</div>

				<YearMonthSelect
					currentDate={currentDate}
					handleCurrentDate={setCurrentDate}
				/>

				{diariesByMonth.length === 0 ? (
					<div className="w-full absolute_center">
						<NonDataFallback>
							<p>아직 작성된 일기가 없어요.</p>
							<p>일기를 먼저 작성해야 탐색이 가능해요.</p>
						</NonDataFallback>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center gap-[12px] w-[95%] mt-[24px]">
						{diariesByMonth.map((diary: Diary, index: number) => (
							<DiaryCard
								key={diary.id}
								diary={diary}
								isCheckable
								isSelected={isSelected.includes(diary)}
								onClick={() => handleDiarySelect(index)}
								className={
									index === diariesByMonth.length - 1 ? 'mb-[100px]' : ''
								}
							/>
						))}
					</div>
				)}

				<div className="bg-white fixed left-0 right-0 bottom-0 z-50 h-[150px] px-[16px]">
					<Button
						variant={
							diariesByMonth.length > 0 && isSelected.length === 0
								? 'primary_disabled'
								: 'primary'
						}
						disabled={diariesByMonth.length > 0 && isSelected.length === 0}
						onClick={handleButtonClick}
					>
						{diariesByMonth.length === 0 ? '일기 작성' : '소프 탐색'}
					</Button>
				</div>
			</div>
		</PageLayout>
	);
};

export default SoafExplorePage;

SoafExplorePage.displayName = 'SoafExplorePage';
