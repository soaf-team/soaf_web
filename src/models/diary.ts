import { Diary, DiaryBackend } from '@/types';

export function transformDiaryKey(data: DiaryBackend): Diary {
	return {
		id: data._id,
		authorId: data.userId,
		title: data.title,
		content: data.content,
		photos: data.imageBox,
		emotions: data.detailedEmotions,
		date: data.date,
		reactions: data.reactions,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	};
}
