import { useFlow } from '@/stackflow';
import { chatSocketManager } from '@/libs';
import { useChatListStore } from '@/store';
import { useFriendListQuery } from '@/hooks';
import { cn, formatDateTime } from '@/utils';

export const ChatList = () => {
	const { friendList } = useFriendListQuery();
	const { chatList } = useChatListStore();
	const { push } = useFlow();

	return (
		<div className="flex flex-col pb-2 overflow-y-auto">
			<ul className="flex flex-col gap-2 pt-[14px] px-[18px]">
				{chatList.map((chat) => {
					const friend = friendList.find(
						(friend) => friend.friend._id === chat.friendId,
					);

					return (
						<li
							key={chat.roomId}
							className={cn(
								'flex justify-between',
								'p-4 w-full',
								'rounded-[16px] shadow-chat',
							)}
							onClick={() => {
								push('ChatRoomPage', {
									roomId: chat.roomId,
									friendId: friend?.friend._id,
								});
								chatSocketManager.emit('enterChat', { roomId: chat.roomId });
							}}
						>
							<div className={LIST_CON_STYLE}>
								<p>{friend?.friend.name ?? '알수없음'}</p>
								<p className="text-sm text-gray300 font-medium">
									{chat.lastMessage?.content[0].includes('base64')
										? '사진'
										: `${chat.lastMessage?.content[0].slice(0, 14)}...`}
								</p>
							</div>
							<div className={cn(LIST_CON_STYLE, 'items-end')}>
								<p className="text-gray600">
									{formatDateTime(chat.lastMessage?.timestamp ?? '')}
								</p>
								{chat.unreadCnt > 0 && (
									<div
										className={cn(
											'flex justify-center items-center',
											'w-[18px] h-[18px]',
											'bg-warn text-white text-[10px] rounded-full',
										)}
									>
										{chat.unreadCnt}
									</div>
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const LIST_CON_STYLE = 'flex flex-col gap-2';
