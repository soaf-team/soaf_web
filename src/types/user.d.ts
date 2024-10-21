export interface User {
	id: string;
	name: string;
	percent: number;
	status: string | null;
}

export type MatchingUser = {
	category: string | null;
	confidenceScore: number;
	createdAt: string;
	diaryId: string;
	isAnalyzed: boolean;
	keywords: string[];
	primaryEmotion: string | null;
	secondaryEmotion: string | null;
	subcategories: string[];
	timeFocus: string | null;
	tone: string | null;
	updatedAt: string;
	userId: string;
	_id: string;
};
