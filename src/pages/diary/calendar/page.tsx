import { ActivityComponentType } from '@stackflow/react';
import { useFlow } from '@/stackflow';

import { ListIcon } from '@/assets';
import { PageLayout } from '@/components/layout';
import { MyDiaryCalendar } from './MyDiaryCalendar';

type DiaryCalendarPageParams = {
	date?: string;
};

const DiaryCalendarPage: ActivityComponentType<DiaryCalendarPageParams> = ({
	params,
}) => {
	const { push } = useFlow();
	const { date } = params;

	const handleClickListButton = () => {
		push('DiaryListPage', {});
	};

	return (
		<PageLayout
			header={{
				rightSlot: {
					component: (
						<img src={ListIcon} alt="list" onClick={handleClickListButton} />
					),
				},
			}}
		>
			<MyDiaryCalendar date={date} />
		</PageLayout>
	);
};

export default DiaryCalendarPage;

DiaryCalendarPage.displayName = 'DiaryCalendarPage';
