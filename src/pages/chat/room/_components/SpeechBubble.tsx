import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { VariantProps, cva } from 'class-variance-authority';

import { ImageGrid } from './ImageGrid';
import { cn } from '@/utils';

dayjs.locale('ko');

const bubbleVariants = cva(
	`inline-flex items-center justify-center rounded-[16px] py-[8px] px-[12px]`,
	{
		variants: {
			variant: {
				isMine: 'bg-primary text-white',
				isOpponent: 'bg-gray50 text-black',
			},
			order: {
				isFirst: 'rounded-tr-[4px]',
				isOpponentFirst: 'rounded-bl-[4px]',
			},
		},
	},
);

interface Props
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof bubbleVariants> {
	nickname?: string;
	type: 'text' | 'image';
	message: string[];
	sentAt: string;
	isLast?: boolean;
	isGap?: boolean;
}

export const SpeechBubble = ({
	nickname,
	message,
	type,
	sentAt,
	isLast,
	isGap,
	variant,
	order,
	className,
	...props
}: Props) => {
	const isMine = variant === 'isMine';

	return (
		<article
			className={`flex gap-[4px] ${isMine ? 'flex-row-reverse' : 'flex-col'} ${isGap ? 'mb-[16px]' : 'mb-[8px]'}`}
		>
			{!isMine && order === 'isOpponentFirst' && (
				<div className="leading-[16px] text-[12px] text-gray400">
					{nickname}
				</div>
			)}

			<div className="flex items-end gap-[4px] max-w-[90%]">
				{isMine && isLast && (
					<div className="text-[10px] whitespace-nowrap text-gray400">
						{dayjs(sentAt).format('A hh:mm')}
					</div>
				)}
				{type === 'text' ? (
					<div
						{...props}
						className={cn(bubbleVariants({ variant, order, className }))}
					>
						<div className="text-[16px]">{message[0]}</div>
					</div>
				) : (
					<ImageGrid images={message} />
				)}
				{!isMine && isLast && (
					<div className="text-[10px] whitespace-nowrap text-gray400">
						{dayjs(sentAt).format('A hh:mm')}
					</div>
				)}
			</div>
		</article>
	);
};
