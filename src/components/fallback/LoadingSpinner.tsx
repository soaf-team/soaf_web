import { LoadingSpinnerIcon } from '@/assets';
import { cn } from '@/utils';

type LoadingSpinnerProps = {
	size?: 'sm' | 'md' | 'lg';
	text?: string;
	color?: string;
};

export const LoadingSpinner = ({
	text,
	size = 'lg',
	color,
}: LoadingSpinnerProps) => {
	const textColor = `text-${color}`;

	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center gap-[14px]',
				TYPE_GAP_SIZE[size],
			)}
		>
			<img
				src={LoadingSpinnerIcon}
				alt="loading_spinner"
				className={cn(['animate-spin', TYPE_SPINNER_SIZE[size]])}
			/>
			{text && <p className={cn([TYPE_TEXT_SIZE[size], textColor])}>{text}</p>}
		</div>
	);
};

const TYPE_SPINNER_SIZE = {
	sm: 'h-10 w-10',
	md: 'h-12 w-12',
	lg: 'h-16 w-16',
};

const TYPE_TEXT_SIZE = {
	sm: 'body2',
	md: 'body1',
	lg: 'head4',
};

const TYPE_GAP_SIZE = {
	sm: 'gap-[10px]',
	md: 'gap-[12px]',
	lg: 'gap-[14px]',
};
