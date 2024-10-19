import { Diary } from '@/types';
import { DiaryCard } from '../pages/diary/_components/DiaryCard';

type DiaryListProps = {
	diariesByMonth: Diary[];
	isSelected?: Diary[];
	isCheckable?: boolean;
	shadow?: boolean;
	handleDiarySelect?: (index: number) => void;
};

export const DiaryList = ({
	diariesByMonth,
	isSelected,
	isCheckable,
	shadow,
	handleDiarySelect,
}: DiaryListProps) => {
	const _handleDiarySelect = (index: number) => {
		if (!handleDiarySelect) return;

		handleDiarySelect(index);
	};

	return (
		<div className="flex flex-col items-center justify-center gap-[12px] w-full">
			{diariesByMonth.map((diary: Diary, index: number) => (
				<DiaryCard
					key={diary.id}
					diary={diary}
					isCheckable={isCheckable}
					shadow={shadow}
					isSelected={
						isSelected === undefined ? false : isSelected.includes(diary)
					}
					onClick={() => _handleDiarySelect(index)}
					className={index === diariesByMonth.length - 1 ? 'mb-[50px]' : ''}
				/>
			))}
		</div>
	);
};
