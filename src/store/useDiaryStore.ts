import { EmotionKey, MoodRating } from '@/types';
import { create } from 'zustand';

export type DiaryFormType = {
	id?: string;
	rating: MoodRating | null;
	title: string;
	content: string;
	photos: string[];
	emotions: EmotionKey[];
	reactions: any[];
	date: string;
	isPublic: boolean;
};

type DiaryRatingStore = {
	diary: DiaryFormType;
	onChangeDate: (date: string) => void;
	onChangeRating: (rating: MoodRating) => void;
	onChangeEmotions: (emotions: EmotionKey[]) => void;
	onChangeEmotionOrder: (emotions: EmotionKey[]) => void;
	onChangePhotos: (photos: string[]) => void;
	onChangeTitle: (title: string) => void;
	onChangeContent: (content: string) => void;
	resetAllDiaryState: () => void;
	togglePublic: () => void;
};

export const useDiaryStore = create<DiaryRatingStore>((set) => {
	const defaultDiary: DiaryFormType = {
		rating: null,
		title: '',
		content: '',
		photos: [],
		emotions: [],
		reactions: [],
		date: '',
		isPublic: false,
	};

	const reorderEmotions = (emotions: EmotionKey[]) => {
		const [first, ...rest] = emotions;
		return [...rest, first];
	};

	return {
		diary: defaultDiary,
		onChangeDate: (date) =>
			set((state) => ({
				diary: {
					...state.diary,
					date,
				},
			})),
		onChangeRating: (rating) =>
			set((state) => ({
				diary: {
					...state.diary,
					rating,
				},
			})),
		onChangeEmotions: (emotions: EmotionKey[]) =>
			set((state) => ({
				diary: {
					...state.diary,
					emotions,
				},
			})),
		onChangeEmotionOrder: (emotions: EmotionKey[]) =>
			set((state) => ({
				diary: {
					...state.diary,
					emotions: reorderEmotions(emotions),
				},
			})),
		onChangePhotos: (photos: string[]) =>
			set((state) => ({
				diary: {
					...state.diary,
					photos,
				},
			})),
		onChangeTitle: (title: string) =>
			set((state) => ({
				diary: {
					...state.diary,
					title,
				},
			})),
		onChangeContent: (content: string) =>
			set((state) => {
				if (content.length <= 2000) {
					return {
						diary: {
							...state.diary,
							content,
						},
					};
				} else {
					return { diary: { ...state.diary } };
				}
			}),
		togglePublic: () =>
			set((state) => ({
				diary: {
					...state.diary,
					isPublic: state.diary.isPublic,
				},
			})),
		resetAllDiaryState: () =>
			set({
				diary: defaultDiary,
			}),
	};
});
