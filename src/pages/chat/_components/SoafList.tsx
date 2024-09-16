import { useState } from 'react';

import { Spacing, DrawerOverlay } from '@/components';
import { overlay } from '@/libs';
import { MyProfile } from './MyProfile';
import { FriendList } from './FriendList';
import { StatusMessageOverlay } from './StatusMessageOverlay';

export const SoafList = () => {
	const [statusMessage, setStatusMessage] = useState<string>('');

	const handleStatusMessageChange = async () => {
		await overlay.open(<StatusMessageOverlay />);
	};

	return (
		<div className="flex flex-col">
			<Spacing size={4} />
			<MyProfile
				statusMessage={statusMessage}
				handleStatusMessageChange={handleStatusMessageChange}
			/>
			<div className="w-full h-[10px] bg-gray50/50" />
			<FriendList />
		</div>
	);
};
