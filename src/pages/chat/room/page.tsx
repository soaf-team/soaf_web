import { useEffect, useLayoutEffect, useRef } from 'react';

import { BackButton, PageLayout } from '@/components';
import { MessageInput, SpeechBubble } from './_components';
import { MyHomeButton } from '../_components';
import { useSocket } from '@/hooks';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

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
	{
		message: '반갑네요',
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
];

const CUSTOMER_ID = 1;

const ChatRoomPage = ({ params }: { params: { userId: string } }) => {
	const { userId } = params;
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const { emit } = useSocket(SOCKET_URL);

	useEffect(() => {
		emit('enterChat', { roomId: String(userId) });
	}, [userId, emit]);

	useLayoutEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [DUMMY_CHAT]);

	return (
		<PageLayout
			className="relative"
			header={{
				leftSlot: <BackButton />,
				title: '정훈',
				rightSlot: <MyHomeButton userId={1} />,
			}}
		>
			<div ref={chatContainerRef} className="flex-grow overflow-y-auto">
				<div className="min-h-full flex flex-col">
					{DUMMY_CHAT.map((data, index, arr) => {
						const isMine = data.userId === CUSTOMER_ID;
						const isFirst =
							index === 0 || arr[index - 1].userId !== data.userId;
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
				</div>
			</div>
			<MessageInput />
		</PageLayout>
	);
};

export default ChatRoomPage;

ChatRoomPage.displayName = 'ChatRoomPage';
