import { DiaryType, DiaryBackend } from '@/types';

export function transformDiaryKey(data: DiaryBackend): DiaryType {
	return {
		id: data._id,
		authorId: data.userId,
		title: data.title,
		content: data.content,
		rating: data.coreEmotion,
		isPublic: data.isPublic,
		photos: data.imageBox,
		emotions: data.detailedEmotions,
		date: data.date,
		reactions: data.reactions || {},
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	};
}
