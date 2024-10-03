import { create } from 'zustand';

import { ChatType, MessageType } from '@/types';

// 전체 채팅방 리스트
type ChatListStore = {
	chatList: ChatType[];
	setChatList: (rooms: ChatType[]) => void;
};

export const useChatListStore = create<ChatListStore>((set) => ({
	chatList: [],
	setChatList: (chat) => set({ chatList: chat }),
}));

// 현재 입장 채팅방
type CurrentChatType = {
	chatHistoryList: MessageType[];
	setChatHistoryList: (chat: MessageType[]) => void;
};

export const useCurrentChatStore = create<CurrentChatType>((set) => ({
	chatHistoryList: [],
	setChatHistoryList: (chat) => set({ chatHistoryList: chat }),
}));
