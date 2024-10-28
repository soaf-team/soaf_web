import { useBlockUserListQuery, useUserBlockMutations } from '@/hooks';
import { BackButton, Divider, PageLayout } from '@/components';
import { BlockedUserItem } from './_components/BlockedUserItem';

const BlockedPage = () => {
	const { blockedUserList } = useBlockUserListQuery();
	const { deleteBlockUserMutation } = useUserBlockMutations();

	const handleUnBlock = (id: string, name: string) => {
		deleteBlockUserMutation.mutate({
			params: {
				userId: id,
				userName: name,
			},
		});
	};

	return (
		<PageLayout
			header={{
				title: <h2 className="head6b">차단친구 관리</h2>,
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			{blockedUserList.data.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-full">
					<p className="body2m text-gray200">차단된 친구가 없어요</p>
				</div>
			) : (
				<div className="flex flex-col">
					{blockedUserList.data.map((user) => (
						<>
							<BlockedUserItem
								key={user.id}
								userName={user.name}
								onUnblock={() => handleUnBlock(user.id, user.name)}
							/>
							<Divider className="bg-gray100" />
						</>
					))}
				</div>
			)}
		</PageLayout>
	);
};

export default BlockedPage;
BlockedPage.displayName = 'BlockedPage';
