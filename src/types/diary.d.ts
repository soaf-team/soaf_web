import { Emotion } from './emotion';

export type Diary = {
	id: string;
	authorId: string;
	title: string;
	content: string;
	photos: string[];
	emotions: Emotion[];
	date: string;
	reactions: {
		[key: string]: number;
	};
};

export type MoodRating = 1 | 2 | 3 | 4 | 5;
