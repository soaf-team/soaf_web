import { useUserProfileQuery } from '@/hooks';
import { useSettingMenuItems } from './hooks';
import { BackButton, Divider, PageLayout, Switch } from '@/components';
import { ActivityComponentType } from '@stackflow/react';
import { MenuList, UserNameSection } from './_components';

// TODO: 알림 로직, 앱 버전 추가

const SettingPage: ActivityComponentType = () => {
	const { userProfile } = useUserProfileQuery();
	const { MENU_ITEMS1, MENU_ITEMS2 } = useSettingMenuItems();
	return (
		<PageLayout
			header={{
				title: <h2 className="head6b">설정</h2>,
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			<UserNameSection userName={userProfile.name} />

			<div className="mx-[-20px]">
				<Divider className="h-2.5 bg-gray50" />
			</div>

			<div className="w-full flex items-center justify-between py-[22px]">
				<span className="text-black">알림 설정</span>
				<Switch defaultChecked={true} onCheckedChange={() => {}} checked />
			</div>

			<Divider className="bg-gray50" />

			<MenuList items={MENU_ITEMS1} />
			<Divider className="bg-gray50" />
			<MenuList items={MENU_ITEMS2} />

			<div className="w-full flex items-center justify-between py-[22px]">
				<span className="text-black">앱 버전 정보</span>
				<span className="label2 text-gray400">최신버전</span>
			</div>
		</PageLayout>
	);
};

export default SettingPage;
SettingPage.displayName = 'SettingPage';
