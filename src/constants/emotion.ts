import {
	Angry,
	Anxious,
	Comfortable,
	Flutter,
	Funny,
	Gloomy,
	Happy,
	Lonely,
	Proud,
	Pleased,
	Sad,
	Tired,
} from '@/assets';
import { EmotionDetail, EmotionKey } from '../types';

export const EMOTIONS: Record<EmotionKey, EmotionDetail> = {
	행복한: { icon: Happy, color: 'bg-happy', noun: '행복' },
	기분좋은: { icon: Pleased, color: 'bg-pleased', noun: '기분 좋음' },
	즐거운: { icon: Funny, color: 'bg-funny', noun: '즐거움' },
	설레는: { icon: Flutter, color: 'bg-flutter', noun: '설렘' },
	뿌듯한: { icon: Proud, color: 'bg-proud', noun: '뿌듯' },
	편안한: { icon: Comfortable, color: 'bg-comfortable', noun: '편안' },
	피곤한: { icon: Tired, color: 'bg-tired', noun: '피곤' },
	외로운: { icon: Lonely, color: 'bg-lonely', noun: '외로움' },
	슬픈: { icon: Sad, color: 'bg-sad', noun: '슬픔' },
	우울한: { icon: Gloomy, color: 'bg-gloomy', noun: '우울' },
	불안한: { icon: Anxious, color: 'bg-anxious', noun: '불안' },
	화난: { icon: Angry, color: 'bg-angry', noun: '화남' },
};
