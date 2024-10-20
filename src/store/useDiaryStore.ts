import { DiaryType, EmotionKey, MoodRating } from '@/types';
import { create } from 'zustand';

export type PhotoType = {
	file: File | null;
	previewUrl: string;
};

export type DiaryFormType = {
	id?: string;
	rating: MoodRating | null;
	title: string;
	content: string;
	photos: PhotoType[];
	emotions: EmotionKey[];
	reactions: {
		[key: string]: string[];
	};
	date: string;
	isPublic: boolean;
};

type DiaryRatingStore = {
	diary: DiaryFormType;
	onChangeDate: (date: string) => void;
	onChangeRating: (rating: MoodRating) => void;
	onChangeEmotions: (emotions: EmotionKey[]) => void;
	onChangeEmotionOrder: (emotions: EmotionKey[]) => void;
	onChangePhotos: (photos: PhotoType[]) => void;
	onChangeTitle: (title: string) => void;
	onChangeContent: (content: string) => void;
	resetAllDiaryState: () => void;
	togglePublic: () => void;
	setDiary: (diary: DiaryType) => void;
};

export const useDiaryStore = create<DiaryRatingStore>((set) => {
	const defaultDiary: DiaryFormType = {
		rating: null,
		title: '',
		content: '',
		photos: [],
		emotions: [],
		reactions: {},
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
		onChangePhotos: (photos: PhotoType[]) =>
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
		setDiary: (diary: DiaryType) =>
			set({
				diary: {
					id: diary.id,
					rating: diary.rating,
					title: diary.title,
					content: diary.content,
					photos: diary.photos.map((photo) => ({
						file: null,
						previewUrl: photo,
					})),
					emotions: diary.emotions,
					reactions: diary.reactions,
					date: diary.date,
					isPublic: diary.isPublic,
				},
			}),
	};
});
