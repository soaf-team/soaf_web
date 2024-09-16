import { AsyncBoundary, BackButton, PageLayout } from '@/components';
import { ActivityComponentType } from '@stackflow/react';
import { useState } from 'react';
import { MyDiaryList } from './MyDiaryList';
import { YearMonthSelect } from '@/components/YearMonthSelect';

const DiaryListPage: ActivityComponentType = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	return (
		<PageLayout header={{ leftSlot: <BackButton /> }}>
			<div className="flex flex-col items-center gap-[22px]">
				<YearMonthSelect
					currentDate={currentDate}
					handleCurrentDate={setCurrentDate}
				/>
				<AsyncBoundary>
					<MyDiaryList currentDate={currentDate} />
				</AsyncBoundary>
			</div>
		</PageLayout>
	);
};

export default DiaryListPage;

DiaryListPage.displayName = 'DiaryListPage';
