import { Card, CheckBox, EmotionSticker } from '@/components';
import { useFlow } from '@/stackflow';
import { Diary } from '@/types';
import { cn, removeHtmlTags } from '@/utils';
import dayjs from 'dayjs';

interface Props {
	diary: Diary;
	isCheckable?: boolean;
	isSelected?: boolean;
	shadow?: boolean;
	onClick?: () => void;
	className?: string;
}

export const DiaryCard = ({
	diary,
	isCheckable = false,
	isSelected = false,
	shadow,
	onClick,
	className,
}: Props) => {
	const { push } = useFlow();

	return (
		<Card
			direction="row"
			shadow={shadow}
			isSelected={isSelected}
			onClick={() => {
				push('DiaryDetailPage', { diaryId: diary.id });
			}}
			className={cn(['relative w-full gap-[12px]', className])}
		>
			<div className="flex flex-col justify-center items-center w-[40px] min-w-[40px] h-[40px] bg-gray50 px-[10px] py-[6px] rounded-lg">
				<p className="text-[16px] text-gray400 font-black leading-[20px]">
					{diary.date.split('.')[2]}
				</p>
				<p className="text-[10px] text-gray200 leading-[12px] font-semibold">
					{dayjs(diary.date).format('ddd')}
				</p>
			</div>
			<div className="flex flex-col gap-[15px]">
				<div className="flex items-center">
					<div className="flex flex-col justify-start gap-[4px]">
						<p className="label2">{diary.title}</p>
						<div className="flex">
							{diary.emotions.map((emotion, index) => (
								<EmotionSticker
									key={index}
									emotion={emotion}
									size="sm"
									style={{
										transform: `translateX(-${index * 5}px)`,
										zIndex: diary.emotions.length - index,
									}}
								/>
							))}
						</div>
					</div>

					{isCheckable && (
						<div className="absolute top-[16px] right-[16px]">
							<CheckBox
								isChecked={isSelected}
								onClick={(e) => {
									e.stopPropagation();
									onClick?.();
								}}
							/>
						</div>
					)}
				</div>
				<div className="w-full h-px bg-border" />
				<div className="flex align-center gap-[17px]">
					<p className="overflow-hidden body4 line-clamp-3 overflow-ellipsis">
						{removeHtmlTags(diary.content)}
					</p>
					<div className="w-[48px] min-w-[48px] h-[48px] rounded-[10px] bg-gray50">
						<img
							src={diary.photos[0]}
							alt="diary-photo"
							className="object-cover w-full h-full rounded-[10px]"
						/>
					</div>
				</div>
			</div>
		</Card>
	);
};
