export type MessageType = {
	content: string[];
	id: string;
	readBy: string[];
	senderId: string;
	timestamp: string;
	type: 'text' | 'image';
};

export type ChatType = {
	available: boolean;
	friendId: string;
	isGroupChat: boolean;
	lastMessage: MessageType | null;
	roomId: string;
	unreadCnt: number;
};
