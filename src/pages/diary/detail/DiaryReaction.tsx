import { PropsWithChildren, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
import { ReactionKeyType } from '@/types';
import { QUOTES } from '@/constants/quotes';
import { createPortal } from 'react-dom';

type DiaryReactionProps = {
	reactions: {
		[key: string]: string[];
	};
	userId: string;
	handleReactionClick: (reactionType: ReactionKeyType) => void;
	isMyDiary: boolean;
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

export const DiaryReaction = ({
	userId,
	reactions,
	handleReactionClick,
	isMyDiary,
}: DiaryReactionProps) => {
	const [isOpened, setIsOpened] = useState(false);
	const isNotReacted = Object.values(reactions).every(
		(users) => !users.includes(userId),
	);
	const isReacted = Object.values(reactions).some((users) =>
		users.includes(userId),
	);

	const reactionEntries = Object.entries(reactions);
	const chunkedReactions = chunkArray(reactionEntries, ITEMS_PER_ROW);

	const handleHeartButtonClick = () => {
		setIsOpened(true);
	};

	const getRandomQuotes = () => {
		const randomIndex = Math.floor(Math.random() * QUOTES.length);
		return QUOTES[randomIndex];
	};

	return (
		<div className="pb-[40px]">
			<div className="relative w-full border-t border-solid border-border py-[16px]">
				<motion.div
					className="flex flex-col gap-[6px]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					{chunkedReactions.map((chunk, rowIndex) => (
						<div
							key={rowIndex}
							className="flex flex-wrap gap-[6px] justify-start cursor-pointer"
						>
							{chunk.map(([key, users]) => (
								<motion.div
									key={key}
									className="flex items-center gap-[4px] label4 text-black/70"
									onClick={() => {
										if (isReacted) {
											return;
										}
										handleReactionClick(key as ReactionKeyType);
									}}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
								>
									<motion.img
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
								</motion.div>
							))}
						</div>
					))}
				</motion.div>
			</div>
			<div className="relative w-full border-t border-solid border-border py-[10px]">
				{isNotReacted && (
					<motion.div
						className="flex items-center gap-[10px] body4 cursor-pointer"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						onClick={handleHeartButtonClick}
					>
						<motion.img
							src={HeartCircle}
							alt="heart-circle"
							className="w-[22px] h-[20px]"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						/>
						{isMyDiary ? getRandomQuotes() : INFO_MESSAGE}
					</motion.div>
				)}
			</div>

			<Portal>
				<AnimatePresence mode="wait">
					{isOpened && (
						<ReactionCloud
							onCloudClose={() => setIsOpened(false)}
							handleReactionClick={handleReactionClick}
						/>
					)}
				</AnimatePresence>
			</Portal>
		</div>
	);
};

const Portal = ({ children }: PropsWithChildren) => {
	return createPortal(children, document.body);
};

const ReactionCloud = ({
	onCloudClose,
	handleReactionClick,
}: {
	onCloudClose: () => void;
	handleReactionClick: (reactionType: ReactionKeyType) => void;
}) => {
	const handleEmojiClick = (emoji: string) => {
		onCloudClose();
		handleReactionClick(emoji as ReactionKeyType);
	};

	return (
		<motion.div
			className="fixed inset-0 max-w-window m-auto z-[9999]"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				className="absolute inset-0 max-w-window m-auto bg-overlay"
				onClick={(e) => {
					e.stopPropagation();
					onCloudClose();
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
			/>
			<motion.div
				className="absolute flex bottom-[106px] left-[24px] m-auto w-[288px] h-[133px] z-[10000]"
				initial={{ scale: 0.8, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.8, opacity: 0, y: 20 }}
				transition={{ type: 'spring', damping: 20, stiffness: 300 }}
			>
				<div className="absolute w-full h-full grid grid-cols-5 py-[12px] px-[12px]">
					{Object.values(REACTION_EMOJI).map((emoji, index) => (
						<motion.div
							key={index}
							onClick={() => handleEmojiClick(emoji.value)}
							className="flex flex-col items-center justify-center text-[10px] leading-[12px] font-semibold cursor-pointer"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.03 }}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<motion.img
								src={emoji?.icon}
								alt={emoji?.label}
								className="w-[38px] h-[38px]"
							/>
							{emoji.label}
						</motion.div>
					))}
				</div>
				<motion.img
					src={ReactionCloudIcon}
					alt="reaction-cloud"
					className="absolute w-[296px] h-[157px] z-[-1]"
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					transition={{ duration: 0.2 }}
				/>
			</motion.div>
		</motion.div>
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
