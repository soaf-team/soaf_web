import { AsyncBoundary, BackButton, PageLayout } from '@/components';
import { ActivityComponentType } from '@stackflow/react';
import { useState } from 'react';
import { MyDiaryList } from './MyDiaryList';
import { YearMonthSelect } from '@/components/YearMonthSelect';

const DiaryListPage: ActivityComponentType = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	return (
		<PageLayout
			header={{
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			<div className="relative flex flex-col items-center gap-[6px]">
				<div className="sticky flex justify-center top-0 w-full pb-[16px] bg-white z-50">
					<YearMonthSelect
						currentDate={currentDate}
						handleCurrentDate={setCurrentDate}
					/>
				</div>
				<AsyncBoundary>
					<MyDiaryList currentDate={currentDate} />
				</AsyncBoundary>
			</div>
		</PageLayout>
	);
};

export default DiaryListPage;

DiaryListPage.displayName = 'DiaryListPage';
