import { PageLayout } from '@/components';
import { ActivityComponentType } from '@stackflow/react';
import { useState } from 'react';
import { DiaryStats } from './DiaryStats';
import { YearMonthSelect } from '@/components/YearMonthSelect';
import { cn } from '@/utils';

const DiaryStatsPage: ActivityComponentType = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	return (
		<PageLayout>
			<div className="relative flex flex-col items-center gap-[16px] pb-[20px]">
				<div
					className={cn(
						'sticky top-0 w-full z-50 flex',
						'justify-center items-center pt-[14px]',
						'pb-[6px] bg-white',
					)}
				>
					<YearMonthSelect
						currentDate={currentDate}
						handleCurrentDate={setCurrentDate}
					/>
				</div>
				<DiaryStats currentDate={currentDate} />
			</div>
		</PageLayout>
	);
};

export default DiaryStatsPage;

DiaryStatsPage.displayName = 'DiaryStatsPage';
