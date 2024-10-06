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

export type Friend = {
	email: string;
	name: string;
	_id: string;
};

export type FriendType = {
	_id: string;
	user1Id: string;
	user2Id: string;
	createdAt: string;
	updatedAt: string;
	friend: Friend;
};
