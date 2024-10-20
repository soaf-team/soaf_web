import { useEffect, useState } from 'react';

import { cn } from '@/utils';
import {
	AmazingEmoji,
	AngryEmoji,
	BestEmoji,
	CheerEmoji,
	FightingEmoji,
	FunnyEmoji,
	HeartCircle,
	ImpressionEmoji,
	OkayEmoji,
	SadEmoji,
	SympathyEmoji,
	ReactionCloud as ReactionCloudIcon,
} from '@/assets';

type DiaryReactionProps = {
	reactions: {
		[key: string]: string[];
	};
};

const ITEMS_PER_ROW = [3, 4, 3];
const INFO_MESSAGE = '일기에 대한 따뜻한 마음을 남겨보세요.';

const chunkArray = (array: any[], sizes: number[]) => {
	const result = [];
	let index = 0;
	for (const size of sizes) {
		result.push(array.slice(index, index + size));
		index += size;
	}
	return result;
};

export const DiaryReaction = ({ reactions }: DiaryReactionProps) => {
	const [isOpened, setIsOpened] = useState(false);

	const handleHeartButtonClick = () => {
		setIsOpened(true);
	};

	const reactionEntries = Object.entries(reactions);
	const chunkedReactions = chunkArray(reactionEntries, ITEMS_PER_ROW);

	return (
		<div className="relative w-full border-t border-solid border-border py-[16px]">
			{Object.keys(reactions).length > 0 ? (
				<div className="flex flex-col gap-[6px]">
					{chunkedReactions.map((chunk, rowIndex) => (
						<div
							key={rowIndex}
							className="flex flex-wrap gap-[6px] justify-start"
						>
							{chunk.map(([key, users]) => (
								<div
									key={key}
									className="flex items-center gap-[4px] label4 text-black/70"
								>
									<img
										src={
											REACTION_EMOJI[key as keyof typeof REACTION_EMOJI]?.icon
										}
										alt={
											REACTION_EMOJI[key as keyof typeof REACTION_EMOJI]?.label
										}
										className="w-[22px] h-[20px]"
									/>
									{REACTION_EMOJI[key as keyof typeof REACTION_EMOJI]?.label}{' '}
									{users.length}
								</div>
							))}
						</div>
					))}
				</div>
			) : (
				<div className="flex items-center gap-[10px] body4">
					<img
						src={HeartCircle}
						alt="heart-circle"
						className="w-[22px] h-[20px]"
						onClick={handleHeartButtonClick}
					/>
					{INFO_MESSAGE}
				</div>
			)}
			<ReactionCloud
				isVisible={isOpened}
				onCloudClose={() => setIsOpened(false)}
			/>
		</div>
	);
};

const ReactionCloud = ({
	isVisible,
	onCloudClose,
}: {
	isVisible: boolean;
	onCloudClose: () => void;
}) => {
	const [visible, setVisible] = useState(isVisible);
	const visibleStyle = isVisible ? 'animate-fadeIn' : 'animate-fadeOut';

	const handleEmojiClick = (emoji: string) => {
		onCloudClose();
	};

	useEffect(() => {
		if (isVisible) {
			setVisible(true);
		} else {
			const timeout = setTimeout(() => {
				setVisible(false);
			}, 300);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [isVisible]);

	if (!visible) return null;

	return (
		<div
			className={cn([
				'fixed inset-0 max-w-window m-auto transition-all duration-300 z-[9999]',
				visibleStyle,
			])}
		>
			<div
				className={cn(['absolute inset-0 max-w-window m-auto bg-overlay'])}
				onClick={(e) => {
					e.stopPropagation();
					onCloudClose();
				}}
			/>
			<div className="absolute flex bottom-[78px] left-[16px] m-auto w-[288px] h-[133px] z-[10000]">
				<div className="absolute w-full h-full grid grid-cols-5 gap- py-[12px] px-[12px]">
					{Object.values(REACTION_EMOJI).map((emoji, index) => (
						<div
							key={index}
							onClick={() => handleEmojiClick(emoji.label)}
							className="flex flex-col items-center justify-center text-[10px] leading-[12px] font-semibold"
						>
							<img
								src={emoji?.icon}
								alt={emoji?.label}
								className="w-[38px] h-[38px]"
							/>
							{emoji.label}
						</div>
					))}
				</div>
				<img
					src={ReactionCloudIcon}
					alt="reaction-cloud"
					className="absolute w-[296px] h-[157px] z-[-1]"
				/>
			</div>
		</div>
	);
};

const REACTION_EMOJI = {
	best: { label: '최고예요', icon: BestEmoji, value: 'best' },
	empathy: { label: '공감해요', icon: SympathyEmoji, value: 'empathy' },
	cheer: { label: '응원해요', icon: CheerEmoji, value: 'cheer' },
	good: { label: '괜찮아요', icon: OkayEmoji, value: 'good' },
	touching: { label: '감동이예요', icon: ImpressionEmoji, value: 'touching' },
	amazing: { label: '대단해요', icon: AmazingEmoji, value: 'amazing' },
	support: { label: '힘내요', icon: FightingEmoji, value: 'support' },
	funny: { label: '웃겨요', icon: FunnyEmoji, value: 'funny' },
	angry: { label: '화나요', icon: AngryEmoji, value: 'angry' },
	sad: { label: '슬퍼요', icon: SadEmoji, value: 'sad' },
};
