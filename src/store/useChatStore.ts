import { create } from 'zustand';

import { ChatType, MessageType } from '@/types';

type ChatListStore = {
	chatList: ChatType[];
	setChatList: (rooms: ChatType[]) => void;
};

export const useChatListStore = create<ChatListStore>((set) => ({
	chatList: [],
	setChatList: (chat) => set({ chatList: chat }),
}));
