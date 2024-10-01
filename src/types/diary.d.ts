import { EmotionKey } from './emotion';

export type DiaryBackend = {
	_id: string;
	title: string;
	date: string;
	content: string;
	coreEmotion: MoodRating;
	detailedEmotions: EmotionKey[];
	isPublic: boolean;
	userId: string;
	createdAt: string;
	updatedAt: string;
	imageBox: string[];
	reactions: {
		[key: string]: number;
	};
};

export type Diary = {
	id: string;
	authorId: string;
	title: string;
	content: string;
	photos: string[];
	rating: MoodRating;
	emotions: EmotionKey[];
	date: string;
	reactions: {
		[key: string]: number;
	};
	createdAt: string;
	updatedAt: string;
	isPublic: boolean;
};

export type MoodRating = 1 | 2 | 3 | 4 | 5;
