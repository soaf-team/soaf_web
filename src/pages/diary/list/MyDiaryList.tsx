import dayjs from 'dayjs';
import { useFlow } from '@/stackflow';

import { useMyDiaryListQuery } from '@/hooks';

import { DiaryList } from '../../../components/DiaryList';
import { Button, NonDataFallback } from '@/components';

const NO_DIARY_MESSAGE =
	'아직 작성된 일기가 없어요.\n오늘의 일기를 작성해보실래요?';
const BUTTON_TEXT = '일기 작성';

type MyDiaryListProps = {
	currentDate: Date;
};

export const MyDiaryList = ({ currentDate }: MyDiaryListProps) => {
	const year = dayjs(currentDate).year();
	const month = dayjs(currentDate).month() + 1;

	const { currentUserDiaryList } = useMyDiaryListQuery(year, month);

	const { replace } = useFlow();

	const handleClickWriteDiaryButton = () => {
		replace('DiaryCalendarPage', {});
	};

	if (currentUserDiaryList.length === 0) {
		return (
			<>
				<div className="w-full absolute_center pb-[10vh]">
					<NonDataFallback>
						<p className="text-center whitespace-pre-line">
							{NO_DIARY_MESSAGE}
						</p>
					</NonDataFallback>
				</div>
				<div className="fixed_bottom_button">
					<Button variant="primary" onClick={handleClickWriteDiaryButton}>
						{BUTTON_TEXT}
					</Button>
				</div>
			</>
		);
	}

	return <DiaryList diariesByMonth={currentUserDiaryList} shadow={false} />;
};
