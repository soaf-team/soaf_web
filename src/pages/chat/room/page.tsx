import { useEffect, useLayoutEffect, useRef } from 'react';

import { BackButton, PageLayout } from '@/components';
import { MessageInput, SpeechBubble } from './_components';
import { MyHomeButton } from '../_components';
import { chatSocketManager } from '@/libs';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

type ChatMessage = {
	id: string;
	senderId: string;
	type: 'text' | 'image';
	content: string[];
	timestamp: string;
	readBy: string[];
};

const DUMMY_CHAT: ChatMessage[] = [
	{
		id: '1',
		senderId: '1',
		type: 'text',
		content: ['안녕'],
		timestamp: '2024-03-15T09:00:00.000Z',
		readBy: ['1'],
	},
	{
		id: '2',
		senderId: '1',
		type: 'text',
		content: ['안녕하세요'],
		timestamp: '2024-03-15T09:01:00.000Z',
		readBy: ['1'],
	},
	{
		id: '3',
		senderId: '1',
		type: 'text',
		content: ['테스트'],
		timestamp: '2024-03-15T09:02:00.000Z',
		readBy: ['1'],
	},
	{
		id: '4',
		senderId: '2',
		type: 'text',
		content: [
			'네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요네 안녕하세요',
		],
		timestamp: '2024-03-15T09:03:00.000Z',
		readBy: ['1', '2'],
	},
	{
		id: '5',
		senderId: '2',
		type: 'image',
		content: ['/nong1.png'],
		timestamp: '2024-03-15T09:03:00.000Z',
		readBy: ['1', '2'],
	},
	{
		id: '6',
		senderId: '1',
		type: 'text',
		content: [
			'까불지 마세요 까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요',
		],
		timestamp: '2024-03-15T09:05:00.000Z',
		readBy: ['1'],
	},
	{
		id: '7',
		senderId: '1',
		type: 'text',
		content: [
			'까불지 마세요 까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요까불지 마세요',
		],
		timestamp: '2024-03-15T09:06:00.000Z',
		readBy: ['1'],
	},
	{
		id: '8',
		senderId: '2',
		type: 'text',
		content: ['반갑네요'],
		timestamp: '2024-03-15T09:07:00.000Z',
		readBy: ['1', '2'],
	},
	{
		id: '9',
		senderId: '2',
		type: 'text',
		content: ['반갑네요'],
		timestamp: '2024-03-15T09:08:00.000Z',
		readBy: ['1', '2'],
	},
	{
		id: '10',
		senderId: '2',
		type: 'image',
		content: ['/nong1.png', '/nong2.png', '/nong3.png', '/nong4.jpeg'],
		timestamp: '2024-03-15T09:03:00.000Z',
		readBy: ['1', '2'],
	},
];

const CUSTOMER_ID = 1;

const ChatRoomPage = ({ params }: { params: { roomId: string } }) => {
	const { roomId } = params;
	const chatContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		chatSocketManager.connectForPage('ChatRoom');
		chatSocketManager.on('chatList', (messages: any[]) => {
			console.log(messages);
		});

		return () => {
			chatSocketManager.disconnectForPage('ChatRoom');
			chatSocketManager.off('chatList', (message) => {
				console.log(message);
			});
		};
	}, [roomId]);

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
						const isMine = Number(data.senderId) === CUSTOMER_ID;
						const isFirst =
							index === 0 || arr[index - 1].senderId !== data.senderId;
						const currentMessage = arr[index];
						const nextMessage = arr[index + 1];
						const isGap =
							isFirst ||
							index === arr.length - 1 ||
							nextMessage.senderId === currentMessage.senderId
								? false
								: true;
						const isLast =
							!nextMessage || nextMessage.senderId !== data.senderId;

						return (
							<SpeechBubble
								key={index}
								type={data.type}
								message={data.content}
								sentAt={data.timestamp}
								//TODO: 이후에 senderId로 유저 정보 가져오도록 수정 필요
								nickname={data.senderId}
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
			<MessageInput roomId={roomId} />
		</PageLayout>
	);
};

export default ChatRoomPage;

ChatRoomPage.displayName = 'ChatRoomPage';
