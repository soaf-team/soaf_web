import { BackButton, Card, PageLayout, Spacing } from '@/components';
import { SoafRejectOverlay, SoafRequestNotifyOverlay } from './_components';
import {
	NotifyType,
	useNotificationListQuery,
	useSoafAcceptMutation,
	useSoafRejectMutation,
} from '@/hooks';
import { overlay } from '@/libs';
import { formatDateTime } from '@/utils';

const NotificationPage = () => {
	const { notificationList } = useNotificationListQuery();
	const { createSoafAcceptMutation } = useSoafAcceptMutation();
	const { createSoafRejectMutation } = useSoafRejectMutation();

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
							<Card
								key={index}
								shadow
								className="leading-6"
								onClick={() => {
									handleRequestSoaf(notify);
								}}
							>
								<div className="flex items-center justify-between">
									<h4>{notify.senderName}님의 소프신청</h4>
									<p className="text-[14px] text-gray600">
										{formatDateTime(notify.lastRequestDate)}
									</p>
								</div>
								<Spacing size={8} />
								<p className="text-[14px] text-gray300 font-medium">
									{notify.message}
								</p>
							</Card>
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
