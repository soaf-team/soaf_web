import { DiaryType } from '@/types';
import { DiaryCard } from '../pages/diary/_components/DiaryCard';

type DiaryListProps = {
	diariesByMonth: DiaryType[];
	isSelected?: DiaryType[];
	isCheckable?: boolean;
	shadow?: boolean;
	handleDiarySelect?: (index: number) => void;
	isFriend?: boolean;
};

export const DiaryList = ({
	diariesByMonth,
	isSelected,
	isCheckable,
	shadow,
	handleDiarySelect,
	isFriend = false,
}: DiaryListProps) => {
	const _handleDiarySelect = (index: number) => {
		if (!handleDiarySelect) return;

		handleDiarySelect(index);
	};

	return (
		<div className="flex flex-col items-center justify-center gap-[12px] w-full">
			{diariesByMonth.map((diary: DiaryType, index: number) => (
				<DiaryCard
					key={diary.id}
					diary={diary}
					isCheckable={isCheckable}
					isFriend={isFriend}
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
