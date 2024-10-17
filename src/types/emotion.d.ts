export type EmotionKey =
	| 'happy'
	| 'good'
	| 'joyful'
	| 'excited'
	| 'proud'
	| 'calm'
	| 'tired'
	| 'lonely'
	| 'sad'
	| 'down'
	| 'worried'
	| 'angry';

export type EmotionDetail = {
	icon: string;
	color: string;
	noun: string;
	label: string;
	value: EmotionKey;
};

const enum Emotion {
	happy = '행복한',
	good = '기분좋은',
	joyful = '즐거운',
	excited = '설레는',
	proud = '뿌듯한',
	calm = '편안한',
	tired = '피곤한',
	lonely = '외로운',
	sad = '슬픈',
	down = '우울한',
	worried = '불안한',
	angry = '화난',
}
