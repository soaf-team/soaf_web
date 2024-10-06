import { useEffect, useLayoutEffect, useRef } from 'react';
import dayjs from 'dayjs';

import { BackButton, PageLayout } from '@/components';
import { MessageInput, SpeechBubble } from './_components';
import { MyHomeButton } from '../_components';
import { chatSocketManager } from '@/libs';
import { useCurrentChatStore } from '@/store';
import { useUserProfileQuery } from '@/hooks';
import { User, MessageType } from '@/types';

type ChatMessage = {
	id: string;
	senderId: string;
	type: 'text' | 'image';
	content: string[];
	timestamp: string;
	readBy: string[];
};

const ChatRoomPage = ({ params }: { params: { roomId: string } }) => {
	const { roomId } = params;
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const { userProfile } = useUserProfileQuery();
	const { chatHistoryList } = useCurrentChatStore();

	useEffect(() => {
		chatSocketManager.connectForPage('ChatRoom');

		return () => {
			chatSocketManager.disconnectForPage('ChatRoom');
		};
	}, [roomId]);

	useLayoutEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chatHistoryList]);

	return (
		<PageLayout
			className="relative"
			header={{
				leftSlot: <BackButton />,
				title: '정훈',
				rightSlot: <MyHomeButton userId="1" />,
			}}
		>
			<div ref={chatContainerRef} className="flex-grow overflow-y-auto">
				<div className="min-h-full flex flex-col">
					{chatHistoryList.map((data, index, arr) => {
						const { isMine, isFirst, isLast, isGap } = getMessageProps(
							data,
							index,
							arr,
							userProfile,
						);

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

const getMessageProps = (
	data: MessageType,
	index: number,
	arr: MessageType[],
	userProfile: User,
) => {
	const isMine = data.senderId === userProfile.id;
	const currentMessage = arr[index];
	const nextMessage = arr[index + 1];
	const prevMessage = arr[index - 1];

	const prevTime = prevMessage
		? dayjs(prevMessage.timestamp).format('YYYY-MM-DD HH:mm')
		: '';
	const currentTime = dayjs(currentMessage.timestamp).format(
		'YYYY-MM-DD HH:mm',
	);
	const nextTime = nextMessage
		? dayjs(nextMessage.timestamp).format('YYYY-MM-DD HH:mm')
		: null;

	return {
		isMine,
		isTimeChange: Boolean(nextTime && currentTime !== nextTime),
		isFirst:
			index === 0 ||
			prevMessage.senderId !== data.senderId ||
			prevTime !== currentTime,
		isLast:
			!nextMessage ||
			nextMessage.senderId !== data.senderId ||
			Boolean(nextTime && currentTime !== nextTime),
		isGap:
			index !== arr.length - 1 &&
			nextMessage.senderId !== currentMessage.senderId,
	};
};
