import { Card, CheckBox, EmotionSticker } from '@/components';
import { Skeleton } from '@/components/async/Skeleton';
import { useFlow } from '@/stackflow';
import { DiaryType } from '@/types';
import { cn, removeHtmlTags } from '@/utils';
import dayjs from 'dayjs';

interface Props {
	diary: DiaryType;
	isCheckable?: boolean;
	isSelected?: boolean;
	shadow?: boolean;
	onClick?: () => void;
	className?: string;
	isFriend?: boolean;
}

export const DiaryCard = ({
	diary,
	isCheckable = false,
	isSelected = false,
	shadow,
	onClick,
	className,
	isFriend = false,
}: Props) => {
	const { push } = useFlow();

	return (
		<Card
			direction="row"
			shadow={shadow}
			isSelected={isSelected}
			onClick={() => {
				isCheckable
					? onClick?.()
					: push('DiaryDetailPage', { diaryId: diary.id, isFriend });
			}}
			className={cn(['relative w-full gap-[12px] cursor-pointer ', className])}
		>
			<div className="flex flex-col justify-center items-center w-[40px] min-w-[40px] h-[40px] bg-gray50 px-[10px] py-[6px] rounded-lg">
				<p className="text-[16px] text-gray400 font-black leading-[20px]">
					{dayjs(diary.date).format('DD')}
				</p>
				<p className="text-[10px] text-gray200 leading-[12px] font-semibold">
					{dayjs(diary.date).format('ddd')}
				</p>
			</div>
			<div className="flex flex-col w-full gap-[15px]">
				<div className="flex items-center">
					<div className="flex flex-col justify-start gap-[4px]">
						<p className="label2">
							{diary.title.length > 18
								? `${diary.title.slice(0, 18)}...`
								: diary.title}
						</p>
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
					<p className="flex-1 overflow-hidden body4 line-clamp-3 overflow-ellipsis">
						{removeHtmlTags(diary.content)}
					</p>
					{diary.photos.length > 0 && (
						<div className="w-[48px] min-w-[48px] h-[48px] rounded-[10px] bg-gray50">
							<img
								src={diary.photos[0]}
								alt="diary-photo"
								className="object-cover w-full h-full rounded-[10px]"
							/>
						</div>
					)}
				</div>
			</div>
		</Card>
	);
};

export const DiaryCardSkeleton = ({ isCheckable = false, shadow = false }) => {
	return (
		<Card
			direction="row"
			shadow={shadow}
			className="relative w-full gap-[12px]"
		>
			<div className="flex flex-col justify-center items-center w-[40px] min-w-[40px] h-[40px] bg-gray50 px-[10px] py-[6px] rounded-lg">
				<Skeleton shape="text" className="w-[20px] h-[20px]" />
				<Skeleton shape="text" className="w-[24px] h-[12px]" />
			</div>

			<div className="flex flex-col w-full gap-[15px]">
				<div className="flex items-center">
					<div className="flex flex-col justify-start gap-[4px]">
						<Skeleton shape="text" className="w-[200px] h-[22px]" />
						<div className="flex h-[24px]">
							{[...Array(3)].map((_, index) => (
								<Skeleton
									key={index}
									shape="circle"
									className="w-[16px] h-[16px]"
									style={{
										transform: `translateX(-${index * 5}px)`,
										zIndex: 3 - index,
									}}
								/>
							))}
						</div>
					</div>
					{isCheckable && (
						<div className="absolute top-[16px] right-[16px]">
							<Skeleton
								shape="rect"
								className="w-[24px] h-[24px] rounded-[8px]"
							/>
						</div>
					)}
				</div>

				<div className="w-full h-px bg-border" />

				<div className="flex align-center gap-[17px]">
					<div className="flex-1 flex flex-col gap-[6px]">
						<Skeleton shape="text" className="w-full h-[20px]" />
						<Skeleton shape="text" className="w-[90%] h-[20px]" />
					</div>
					<Skeleton
						shape="rect"
						className="w-[48px] min-w-[48px] h-[48px] rounded-[10px]"
					/>
				</div>
			</div>
		</Card>
	);
};
