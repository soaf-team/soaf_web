import { EmotionButton } from '@/components';
import { EMOTIONS } from '@/constants';
import { DiaryFormType } from '@/store';
import { EmotionKey } from '@/types';

type EmotionButtonProps = {
	diary: DiaryFormType;
	handleEmotionButtonClick: (emotion: EmotionKey) => void;
};

export const EmotionButtonList = ({
	diary,
	handleEmotionButtonClick,
}: EmotionButtonProps) => {
	return (
		<div className="grid grid-cols-2 gap-x-[12px] gap-y-[10px] w-full mb-[150px]">
			{(Object.keys(EMOTIONS) as EmotionKey[]).map((emotion) => {
				const isSelected = diary.emotions.includes(emotion);

				return (
					<EmotionButton
						key={emotion}
						emotion={emotion}
						selected={isSelected}
						onClick={handleEmotionButtonClick}
					/>
				);
			})}
		</div>
	);
};
