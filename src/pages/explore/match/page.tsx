import { Button, PageLayout } from '@/components';
import { useMatchedUserQuery } from '@/hooks';
import { useFlow } from '@/stackflow';
import { User } from '@/types';
import { useState } from 'react';
import { MatchedUserItem } from './MatchedUserItem';
import { IconBack } from '@stackflow/plugin-basic-ui';
import { XIcon } from '@/assets';

const MatchedUserPage = () => {
	const { replace } = useFlow();
	const { matchedUsers } = useMatchedUserQuery();

	const [selectedUser, setSelectedUser] = useState<number | null>(null);

	const handleSelect = (id: number) => {
		setSelectedUser((prev) => (prev === id ? null : id));
	};

	return (
		<PageLayout
			header={{
				leftSlot: <LeftIcon />,
				rightSlot: <RightIcon />,
			}}
			className="overflow-y-auto"
		>
			<div className="flex flex-col justify-center items-center gap-[8px] overflow-hidden">
				<p className="head4b">매칭된 유저 목록</p>

				<div className="flex flex-col body3 mb-[12px]">
					<p>원하는 유저를 선택하여</p>
					<p>취향을 탐색하고 소프를 맺어 소통해보세요!</p>
				</div>

				<div className="flex flex-col justify-center items-center gap-[12px] w-[95%]">
					{matchedUsers
						.sort((a: any, b: any) =>
							a.percent > b.percent ? -1 : a.percent < b.percent ? 1 : 0,
						)
						.map((user: User, index: number) => (
							<MatchedUserItem
								key={user.id}
								name={user.name}
								percent={user.percent}
								onClick={() => handleSelect(user.id)}
								isSelected={selectedUser === user.id}
								className={
									index === matchedUsers.length - 1 ? 'mb-[120px]' : ''
								}
							/>
						))}
				</div>
			</div>
			<div className="fixed_bottom_button">
				<Button
					disabled={selectedUser === null}
					onClick={() => replace('UserHome', { userId: selectedUser })}
				>
					방문하기
				</Button>
			</div>
		</PageLayout>
	);
};

export default MatchedUserPage;

MatchedUserPage.displayName = 'MatchedUserPage';

const LeftIcon = () => {
	const { pop } = useFlow();

	return (
		<button onClick={pop}>
			<IconBack />
		</button>
	);
};

const RightIcon = () => {
	const { replace } = useFlow();

	return (
		<button onClick={() => replace('DiaryCalendar', {})}>
			<img src={XIcon} alt="x" className="w-[12px] h-[12px]" />
		</button>
	);
};
