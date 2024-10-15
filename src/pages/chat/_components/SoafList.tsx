import { useQueryClient } from '@tanstack/react-query';

import { overlay } from '@/libs';
import { MyProfile } from './MyProfile';
import { FriendList } from './FriendList';
import { StatusMessageOverlay } from './StatusMessageOverlay';
import { QUERY_KEY } from '@/constants';
import { useToast, useUserProfileQuery } from '@/hooks';
import { userMutations } from '@/hooks/mutations';

export const SoafList = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { userProfile } = useUserProfileQuery();

	const { patchUserMutation } = userMutations({
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.userProfile],
			});
			toast({
				title: '상태메시지가 수정되었어요.',
			});
		},
	});

	const handleStatusMessageChange = async () => {
		const status = await overlay.open(
			<StatusMessageOverlay overlayKey="status" />,
		);

		await patchUserMutation.mutateAsync({
			status,
		});
	};

	return (
		<div className="flex flex-col">
			<MyProfile
				userProfile={userProfile}
				handleStatusMessageChange={handleStatusMessageChange}
			/>
			<div className="w-full h-[10px] bg-gray50/50" />
			<FriendList />
		</div>
	);
};
