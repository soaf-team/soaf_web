import { useState } from 'react';

import { Spacing, DrawerOverlay } from '@/components';
import { overlay } from '@/libs';
import { MyProfile } from './MyProfile';
import { FriendList } from './FriendList';
import { StatusMessageOverlay } from './StatusMessageOverlay';

export const SoafList = () => {
	// TODO: 이후 상태가 아닌 데이터 값으로 변경 필요
	const [statusMessage, _] = useState<string>('');

	const handleStatusMessageChange = async () => {
		const status = await overlay.open(
			<StatusMessageOverlay overlayKey="status" />,
		);
	};

	return (
		<div className="flex flex-col">
			<MyProfile
				statusMessage={statusMessage}
				handleStatusMessageChange={handleStatusMessageChange}
			/>
			<div className="w-full h-[10px] bg-gray50/50" />
			<FriendList />
		</div>
	);
};
