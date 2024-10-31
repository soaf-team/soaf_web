import { useState } from 'react';
import { useFlow } from '@/stackflow';
import dayjs from 'dayjs';

import { cn, getDateStatus } from '@/utils';
import { DiaryType } from '@/types';
import { useMyDiaryListQuery } from '@/hooks';
import { Plus } from '@/assets';

import { Drawer, DrawerTrigger, EmotionSticker } from '@/components';
import { Calendar } from '../../_components';
import { DiaryContentDrawer } from './DiaryContentDrawer';
import { YearMonthSelect } from '@/components/YearMonthSelect';

type MyDiaryCalendarProps = {
	date?: string;
};

export const MyDiaryCalendar = ({ date }: MyDiaryCalendarProps) => {
	const { push } = useFlow();
	const [selectedDiary, setSelectedDiary] = useState<DiaryType | null>(null);
	const [currentDate, setCurrentDate] = useState(
		date ? new Date(date) : new Date(),
	);
	const { currentUserDiaryList } = useMyDiaryListQuery(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
	);
	const [activeSnapPoint, setActiveSnapPoint] = useState<
		string | number | null
	>(0.5);

	const handleDateClick = (
		diaryAtDate: DiaryType | undefined,
		isFuture: boolean,
		date: string,
	) => {
		setActiveSnapPoint(0.5);
		if (diaryAtDate) {
			setSelectedDiary(diaryAtDate);
		}
		if (isFuture || diaryAtDate) return;
		push('NewDiaryStep1', {
			date,
		});
	};

	const resetSelectedDiary = () => {
		setTimeout(() => {
			setSelectedDiary(null);
		}, 300);
	};

	return (
		<Drawer
			snapPoints={[0.25, 0.5, 0.92]}
			closeThreshold={0.6}
			fadeFromIndex={3}
			onClose={resetSelectedDiary}
			activeSnapPoint={activeSnapPoint}
			setActiveSnapPoint={setActiveSnapPoint}
		>
			<div className="flex flex-col items-center h-full">
				<YearMonthSelect
					currentDate={currentDate}
					handleCurrentDate={setCurrentDate}
				/>
				<Calendar
					currentDate={currentDate}
					render={(day, index, isToday) => {
						const isFuture = day && getDateStatus(day, new Date()) === 'future';
						const diaryAtDate = currentUserDiaryList.find(
							(diary: DiaryType) =>
								day && getDateStatus(new Date(diary.date), day) === 'today',
						);
						const diaryMainEmotion = diaryAtDate?.emotions[0];
						const dayTextClass = isToday
							? 'text-white bg-gray600 rounded-full'
							: 'text-gray200';
						const dayCircleClass = isFuture
							? 'cursor-default bg-[#F0F1F466]'
							: 'cursor-pointer transition-all duration-200 ease-in-out bg-gray50';

						if (day == null) return <div key={index} />;

						return (
							<div
								key={index}
								className="flex flex-col items-center justify-end gap-[5px]"
							>
								<span
									className={cn([
										'body4 w-[30px] h-[17px] text-gray300 text-center',
										dayTextClass,
									])}
								>
									{day?.getDate()}
								</span>
								<div
									key={index}
									onClick={() =>
										handleDateClick(
											diaryAtDate,
											isFuture,
											dayjs(day).format('YYYY-MM-DD'),
										)
									}
									className={cn([
										'flex items-center justify-center relative h-[40px] w-[40px] rounded-full',
										dayCircleClass,
									])}
								>
									<DrawerTrigger disabled={!diaryAtDate}>
										{diaryMainEmotion && (
											<EmotionSticker emotion={diaryAtDate?.emotions[0]} />
										)}
										{isToday && !diaryMainEmotion && (
											<img
												src={Plus}
												alt="add_icon"
												className="absolute_center w-[12px] h-[12px] pointer-events-none"
											/>
										)}
									</DrawerTrigger>
								</div>
							</div>
						);
					}}
				/>
			</div>

			{selectedDiary && <DiaryContentDrawer diary={selectedDiary} />}
		</Drawer>
	);
};
