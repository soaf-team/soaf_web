import { useEffect } from 'react';

import { BackButton, PageLayout } from '@/components';
import { MessageInput, SpeechBubble } from './_components';
import { MyHomeButton } from '../_components';
import { useSocket } from '@/hooks';

const DUMMY_CHAT = [
	{ message: '안녕', sentAt: new Date().toISOString(), userId: 1 },
	{ message: '안녕하세요', sentAt: new Date().toISOString(), userId: 1 },
	{ message: '테스트', sentAt: new Date().toISOString(), userId: 1 },
	{
		message:
			'네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요',
		nickname: '정훈',
		sentAt: new Date().toISOString(),
		userId: 2,
	},
	{
		message: '반갑네요',
		nickname: '정훈',
		sentAt: new Date().toISOString(),
		userId: 2,
	},
	{
		message:
			'까불지 마세요 까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요',
		sentAt: new Date().toISOString(),
		userId: 1,
	},
	{
		message:
			'까불지 마세요 까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요',
		sentAt: new Date().toISOString(),
		userId: 1,
	},
];

const CUSTOMER_ID = 1;

const ChatRoomPage = () => {
	const { on, off } = useSocket('');

	useEffect(() => {
		const handleNewMessage = (message: any) => {
			// 메시지 처리 로직
		};

		on('newMessage', handleNewMessage);

		return () => {
			off('newMessage', handleNewMessage);
		};
	}, [on, off]);

	return (
		<PageLayout
			className="relative"
			header={{
				leftSlot: <BackButton />,
				title: '정훈',
				rightSlot: <MyHomeButton userId={1} />,
			}}
		>
			{DUMMY_CHAT.map((data, index, arr) => {
				const isMine = data.userId === CUSTOMER_ID;
				const isFirst = index === 0 || arr[index - 1].userId !== data.userId;

				const currentMessage = arr[index];
				const nextMessage = arr[index + 1];
				const isGap =
					isFirst ||
					index === arr.length - 1 ||
					nextMessage.userId === currentMessage.userId
						? false
						: true;

				const isLast = !nextMessage || nextMessage.userId !== data.userId;

				return (
					<SpeechBubble
						key={index}
						message={data.message}
						sentAt={data.sentAt}
						nickname={data.nickname}
						variant={isMine ? 'isMine' : 'isOpponent'}
						order={
							isFirst ? (isMine ? 'isFirst' : 'isOpponentFirst') : undefined
						}
						isLast={isLast}
						isGap={isGap}
					/>
				);
			})}
			<MessageInput />
		</PageLayout>
	);
};

export default ChatRoomPage;

ChatRoomPage.displayName = 'ChatRoomPage';
