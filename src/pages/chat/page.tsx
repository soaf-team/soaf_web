import { useState, useEffect } from 'react';

import { PageLayout } from '@/components';
import { ChatList, MenuBar, SoafList } from './_components';
import { chatSocketManager, socketManager } from '@/libs';
import { useFlow } from '@/stackflow';
import { MessageType, ChatType } from '@/types';
import { useChatListStore } from '@/store';

const TOKEN = import.meta.env.VITE_TOKEN;

const ChatMainPage = () => {
	const [selectedMenu, setSelectedMenu] = useState<'소프 목록' | '친구 목록'>(
		'소프 목록',
	);

	const { setChatList } = useChatListStore();
	const { push } = useFlow();

	useEffect(() => {
		socketManager.setToken(TOKEN);
		socketManager.connect();
		chatSocketManager.connectForPage('ChatList');

		const handleStatus = (status: string) => {
			if (status.includes('initialized')) {
				const roomId = status.split(' ')[0];
				push('ChatRoomPage', {
					roomId,
				});
			}
		};

		const handleChatList = (receivedChatList: ChatType[]) => {
			console.log(receivedChatList);
			setChatList(receivedChatList);
		};

		const handleNewMessage = (message: MessageType) => {
			console.log('New message:', message);
		};

		chatSocketManager.on('status', handleStatus);
		chatSocketManager.on('chatList', handleChatList);
		chatSocketManager.on('newMessage', handleNewMessage);
		chatSocketManager.on('chatHistory', (message) => {
			console.log(message);
		});

		return () => {
			socketManager.disconnect();
			chatSocketManager.off('status', handleStatus);
			chatSocketManager.off('chatList', handleChatList);
			chatSocketManager.off('newMessage', handleNewMessage);
			chatSocketManager.off('chatHistory', (message) => {
				message;
			});
			chatSocketManager.disconnectForPage('ChatList');
		};
	}, []);

	return (
		<PageLayout className="px-0">
			<article className="px-[18px]">
				<MenuBar
					selectedMenu={selectedMenu}
					onChangeMenu={(menu) => {
						setSelectedMenu(menu as '소프 목록' | '친구 목록');
					}}
				/>
			</article>
			{selectedMenu === '소프 목록' ? <SoafList /> : <ChatList />}
		</PageLayout>
	);
};

export default ChatMainPage;

ChatMainPage.displayName = 'ChatMainPage';
