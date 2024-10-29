import { BackButton, PageLayout } from '@/components';
import { useNotificationListQuery } from '@/hooks';

const NotificationPage = () => {
	const { notificationList } = useNotificationListQuery();

	return (
		<PageLayout
			header={{
				title: <h1 className="head6b">알림</h1>,
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			<div>NotificationPage</div>
		</PageLayout>
	);
};

export default NotificationPage;
NotificationPage.displayName = 'NotificationPage';
