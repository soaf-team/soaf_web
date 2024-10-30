import {
	BackButton,
	CancelConfirmDialog,
	PageLayout,
	Spacing,
} from '@/components';
import {
	SoafRejectOverlay,
	SoafRequestNotifyOverlay,
	NotificationCard,
} from './_components';
import {
	NotifyType,
	useNotificationListQuery,
	useSoafAcceptMutation,
	useSoafRejectMutation,
	useSoafRequestMutations,
	useToast,
	useUserBlockMutations,
	useUserProfileQuery,
} from '@/hooks';
import { overlay } from '@/libs';
import { BanDialogOverlay } from '../chat/_components/BanDialogOverlay';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';

const NotificationPage = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { userProfile } = useUserProfileQuery();
	const { notificationList } = useNotificationListQuery();
	const { createSoafAcceptMutation } = useSoafAcceptMutation();
	const { createSoafRejectMutation } = useSoafRejectMutation();
	const { postBlockUserMutation } = useUserBlockMutations();
	const { deleteSoafRequestMutation } = useSoafRequestMutations();

	const handleRequestSoaf = async (notify: NotifyType) => {
		const status = await overlay.open(
			<SoafRequestNotifyOverlay
				overlayKey="request-overlay"
				header={{
					title: `${notify.senderName}님의 소프신청`,
				}}
				requestText={notify.message}
			/>,
		);

		if (status === 'accept') {
			createSoafAcceptMutation.mutateAsync({
				params: {
					requestId: notify._id,
					senderName: notify.senderName,
				},
			});
		} else {
			await overlay.open(<SoafRejectOverlay />);

			await createSoafRejectMutation.mutateAsync({
				params: {
					requestId: notify._id,
				},
			});
		}
	};

	const handleBanButtonClick = async (userName: string, userId: string) => {
		await overlay.open(<BanDialogOverlay userName={userName} />);
		await postBlockUserMutation.mutateAsync({
			payload: {
				userToBlockId: userId,
			},
		});
		await queryClient.invalidateQueries({
			queryKey: [QUERY_KEY.NOTIFICATION_LIST],
		});
		toast({
			title: `${userName}님이 차단되었어요`,
		});
	};

	const handleDeleteNotification = async (
		requestId: string,
		userName: string,
	) => {
		await overlay.open(
			<CancelConfirmDialog
				overlayKey="delete-notification"
				title={`${userName}님 메세지를 삭제할까요?`}
				description={
					<>
						<p>ㆍ삭제하면 소프 요청이 자동으로 거절돼요</p>
						<p className="whitespace-pre-line">
							{`ㆍ거절한 유저는 ${userProfile?.name}님에게`}
						</p>
						<p className="ml-3">일주일 후 소프 재신청이 가능해요</p>
					</>
				}
				confirmButtonText="네, 삭제할래요"
				resolve={() =>
					deleteSoafRequestMutation.mutate({
						params: {
							requestId,
						},
					})
				}
			/>,
		);
	};

	return (
		<PageLayout
			header={{
				title: <h1 className="head6b">알림</h1>,
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			{notificationList.length > 0 ? (
				<>
					<Spacing size={10} />
					<div className="flex flex-col gap-2">
						{notificationList.map((notify, index) => (
							<NotificationCard
								key={notify._id}
								notification={notify}
								onBlock={() =>
									handleBanButtonClick(notify.senderName, notify.senderId)
								}
								onDelete={() =>
									handleDeleteNotification(notify._id, notify.senderName)
								}
								onClick={() => handleRequestSoaf(notify)}
							/>
						))}
					</div>
				</>
			) : (
				<div className="relative h-screen">
					<p className="absolute font-medium -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-gray300">
						알림이 없어요
					</p>
				</div>
			)}
		</PageLayout>
	);
};

export default NotificationPage;

NotificationPage.displayName = 'NotificationPage';
