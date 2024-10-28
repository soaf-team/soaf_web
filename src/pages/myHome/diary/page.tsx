import { BackButton, Button, NonDataFallback, PageLayout } from '@/components';
import { useMyDiaryListQuery, useFriendDiaryListQuery } from '@/hooks';
import { useFlow } from '@/stackflow';
import { useState } from 'react';
import { DiaryFilter } from './_components/DiaryFilter';
import { YearMonthSelect } from '@/components/YearMonthSelect';
import { DiaryList } from '@/components/DiaryList';
import { ActivityComponentType } from '@stackflow/react';
import { cn } from '@/utils';

interface DiaryPageState {
	currentDate: Date;
	isPrivate: boolean;
}

interface Props {
	userId: string;
	userName: string;
}

const MyDiaryPage: ActivityComponentType<Props> = ({ params }) => {
	const { userId, userName } = params; // 타유저 정보
	const { push } = useFlow();

	const [pageState, setPageState] = useState<DiaryPageState>({
		currentDate: new Date(),
		isPrivate: false,
	});

	const { currentUserDiaryList } = useMyDiaryListQuery(
		pageState.currentDate.getFullYear(),
		pageState.currentDate.getMonth() + 1,
		pageState.isPrivate,
	);

	const { data: friendDiaryList } = useFriendDiaryListQuery(
		userId,
		pageState.currentDate.getFullYear(),
		pageState.currentDate.getMonth() + 1,
	);

	const diaryList = userId
		? friendDiaryList?.items || []
		: currentUserDiaryList || [];

	const handleFilterChange = (isPrivate: boolean) => {
		setPageState((prev) => ({
			...prev,
			isPrivate,
		}));
	};

	const handleDateChange = (newDate: Date) => {
		setPageState((prev) => ({
			...prev,
			currentDate: newDate,
		}));
	};

	const handleClickWriteDiaryButton = () => {
		push('NewDiaryStep1', {});
	};

	return (
		<PageLayout
			header={{
				title: (
					<h1 className="head6b">{userId ? `${userName}님의` : '나의'} 일기</h1>
				),
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			<div className="flex flex-col items-center gap-[22px]">
				{!userId && (
					<DiaryFilter
						isPrivate={pageState.isPrivate}
						onFilterChange={handleFilterChange}
					/>
				)}

				<YearMonthSelect
					currentDate={pageState.currentDate}
					handleCurrentDate={handleDateChange}
					className={cn(userId && 'mt-6')}
				/>

				{diaryList?.length === 0 ? (
					<>
						<div className="w-full absolute_center">
							<NonDataFallback>
								{userId ? (
									<p className="text-gray300">아직 작성된 일기가 없어요</p>
								) : (
									<>
										<p className="text-gray300">아직 작성된 일기가 없어요</p>
										<p className="text-gray300">
											오늘의 일기를 작성해보실래요?
										</p>
									</>
								)}
							</NonDataFallback>
						</div>
						{!userId && (
							<div className="fixed_bottom_button">
								<Button variant="primary" onClick={handleClickWriteDiaryButton}>
									일기 작성
								</Button>
							</div>
						)}
					</>
				) : (
					<DiaryList diariesByMonth={diaryList} isFriend={!!userId} />
				)}
			</div>
		</PageLayout>
	);
};

export default MyDiaryPage;

MyDiaryPage.displayName = 'MyDiaryPage';
