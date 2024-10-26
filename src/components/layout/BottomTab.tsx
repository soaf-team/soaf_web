import { Stack } from '@stackflow/core';
import { ACTIVITY } from '@/constants';
import { useActiveActivity } from '@/hooks';
import { useFlow } from '@/stackflow';
import { useBottomTabStore } from '@/store';
import {
	Chat,
	ChatActive,
	DiaryCalendar,
	DiaryCalendarActive,
	DiaryStats,
	DiaryStatsActive,
	MyHome,
	MyHomeActive,
	SoafExplore,
	SoafExploreActive,
} from '@/assets';

export const BottomTab = ({ stack }: { stack: Stack }) => {
	const { replace } = useFlow();
	const { isBottomTabActivity, activeActivity } = useActiveActivity(stack);
	const { isOpen } = useBottomTabStore();

	const handleTabClick = (activity: string) => {
		if (activity === activeActivity.name) {
			return;
		}

		replace(activity, {}, { animate: false });
	};

	if (!isBottomTabActivity) {
		return null;
	}

	return (
		<div
			className={`fixed bottom-0 left-0 right-0 h-[93px] rounded-t-[24px]
    flex items-start justify-around bg-white shadow-bottomTab
    px-[18px] py-[12px] z-[1000] max-w-window mx-auto
    transition-transform duration-500 ease-in-out
    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
		>
			{TABS.map((tab) => {
				const Icon =
					tab.activity === activeActivity.name ? tab.activeIcon : tab.icon;

				return (
					<button
						className="w-[67px] h-[40px]"
						key={tab.activity}
						onClick={() => handleTabClick(tab.activity)}
					>
						<img src={Icon} alt={tab.activity} />
					</button>
				);
			})}
		</div>
	);
};

export const TABS = [
	{
		icon: DiaryCalendar,
		activeIcon: DiaryCalendarActive,
		activity: ACTIVITY.DIARY_CALENDAR,
	},
	{
		icon: DiaryStats,
		activeIcon: DiaryStatsActive,
		activity: ACTIVITY.DIARY_STATS,
	},
	{
		icon: SoafExplore,
		activeIcon: SoafExploreActive,
		activity: ACTIVITY.SOAF_EXPLORE,
	},
	{
		icon: Chat,
		activeIcon: ChatActive,
		activity: ACTIVITY.CHAT,
	},
	{
		icon: MyHome,
		activeIcon: MyHomeActive,
		activity: ACTIVITY.MY_HOME,
	},
] as const;
