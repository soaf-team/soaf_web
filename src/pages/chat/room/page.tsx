import { useEffect, useLayoutEffect, useRef } from 'react';
import dayjs from 'dayjs';

import { BackButton, PageLayout } from '@/components';
import { MessageInput, SpeechBubble } from './_components';
import { MyHomeButton } from '../_components';
import { chatSocketManager } from '@/libs';
import { useCurrentChatStore } from '@/store';
import { useFlow } from '@/stackflow';
import { useFriendListQuery, useUserProfileQuery } from '@/hooks';
import { User, MessageType } from '@/types';

const ChatRoomPage = ({
	params,
}: {
	params: { roomId: string; friendId: string };
}) => {
	const { roomId, friendId } = params;
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const { pop } = useFlow();
	const { userProfile } = useUserProfileQuery();
	const { friendList } = useFriendListQuery();
	const { chatHistoryList, setChatHistoryList } = useCurrentChatStore();

	const nickname = friendList.find((friend) => friend.friend._id === friendId)
		?.friend.name;

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
				leftSlot: {
					component: (
						<BackButton
							onClick={() => {
								setChatHistoryList([]);
								pop();
							}}
						/>
					),
				},
				title: nickname ?? '알수없음',
				rightSlot: {
					component: (
						<MyHomeButton userId={friendId} userName={nickname ?? ''} />
					),
				},
			}}
		>
			<div ref={chatContainerRef} className="flex-grow overflow-y-auto">
				<div className="flex flex-col min-h-full">
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
								nickname={nickname}
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
