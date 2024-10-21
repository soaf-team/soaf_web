import { Button, PageLayout } from '@/components';
import { useMetaQuery } from '@/hooks/queries';
import { useFlow } from '@/stackflow';
import { MatchingUser } from '@/types';
import { useState } from 'react';
import { MatchedUserItem } from '../_components';
import { IconBack } from '@stackflow/plugin-basic-ui';
import { XIcon } from '@/assets';

const MatchedAIUserPage = () => {
	const { replace } = useFlow();
	const { metaUsers } = useMetaQuery();

	const [selectedUser, setSelectedUser] = useState<string | null>(null);

	const handleSelect = (id: string) => {
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
			<div className="flex flex-col justify-center items-center gap-[8px]">
				<p className="head4b">매칭된 유저 목록</p>

				<div className="flex flex-col body3 mb-[12px]">
					<p>원하는 유저를 선택하여</p>
					<p>취향을 탐색하고 소프를 맺어 소통해보세요!</p>
				</div>

				<div className="flex flex-col justify-center items-center gap-[12px] w-[95%] mb-[150px]">
					{metaUsers
						.sort((a: any, b: any) =>
							a.confidenceScore > b.confidenceScore
								? -1
								: a.confidenceScore < b.confidenceScore
									? 1
									: 0,
						)
						.slice(0, 7)
						.map((user: MatchingUser, index: number) => (
							<MatchedUserItem
								key={user.userId}
								name={user.userId}
								percent={user.confidenceScore}
								onClick={() => handleSelect(user.userId)}
								isSelected={selectedUser === user.userId}
								className={index === metaUsers.length - 1 ? 'mb-[120px]' : ''}
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

export default MatchedAIUserPage;

MatchedAIUserPage.displayName = 'MatchedAIUserPage';

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
