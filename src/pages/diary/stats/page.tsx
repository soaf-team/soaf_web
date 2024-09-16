import { PageLayout } from "@/components";
import { ActivityComponentType } from "@stackflow/react";
import { useState } from "react";
import { DiaryStats } from "./DiaryStats";
import { YearMonthSelect } from "@/components/YearMonthSelect";

const DiaryStatsPage: ActivityComponentType = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	return (
		<PageLayout>
			<div className="flex flex-col items-center gap-[16px] pb-[20px]">
				<div className="flex justify-center items-center pt-[14px] pb-[6px]">
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
