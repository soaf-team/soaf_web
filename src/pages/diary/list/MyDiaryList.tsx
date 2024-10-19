import { Button, NonDataFallback } from '@/components';
import { useFlow } from '@/stackflow';
import dayjs from 'dayjs';
import { DiaryList } from '../../../components/DiaryList';
import { useMyDiaryListQuery } from '@/hooks';

type MyDiaryListProps = {
	currentDate: Date;
};

export const MyDiaryList = ({ currentDate }: MyDiaryListProps) => {
	const year = dayjs(currentDate).year();
	const month = dayjs(currentDate).month() + 1;

	const { currentUserDiaryList } = useMyDiaryListQuery(year, month);

	const { push } = useFlow();

	const handleClickWriteDiaryButton = () => {
		push('NewDiaryStep1', {});
	};

	if (currentUserDiaryList.length === 0) {
		return (
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
		);
	}

	return <DiaryList diariesByMonth={currentUserDiaryList} shadow={false} />;
};
